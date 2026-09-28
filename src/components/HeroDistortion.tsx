import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { Link } from '@tanstack/react-router';

export const HeroDistortion: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let isMounted = true;
    let animationFrameId: number;
    const imageUrl = '/adimail.jpeg';
    const mouse = new THREE.Vector2(-1, -1);
    const prevMouse = new THREE.Vector2(-1, -1);
    const followMouse = new THREE.Vector2(-1, -1);
    let targetSpeed = 0;
    let currentSpeed = 0;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let composer: EffectComposer;
    let customPass: ShaderPass;
    let texture: THREE.Texture;
    let planeMesh: THREE.Mesh;
    let planeGeo: THREE.PlaneGeometry;
    let planeMat: THREE.MeshBasicMaterial;

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouse.x = x / rect.width;
      mouse.y = 1.0 - y / rect.height;
    };

    const onMouseLeave = () => {
      targetSpeed = 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        mouse.x = x / rect.width;
        mouse.y = 1.0 - y / rect.height;
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      targetSpeed = 1.0;
      onTouchMove(event);
    };

    let fovRad = 0;
    let imageAspectRatio = 1;

    const onResize = () => {
      if (!container || !renderer || !composer || !camera || !planeMesh) return;
      const currentRect = container.getBoundingClientRect();
      renderer.setSize(currentRect.width, currentRect.height);
      composer.setSize(currentRect.width, currentRect.height);
      if (customPass) {
        customPass.uniforms.resolution.value.set(
          currentRect.width,
          currentRect.height
        );
      }
      camera.aspect = currentRect.width / currentRect.height;
      camera.updateProjectionMatrix();

      const newVisibleHeight = 2 * Math.tan(fovRad) * camera.position.z;
      const newVisibleWidth = newVisibleHeight * camera.aspect;
      const newBaseScale = Math.min(
        newVisibleWidth / (newVisibleHeight * imageAspectRatio),
        1
      );
      const newMarginFactor = window.innerWidth < 768 ? 1.0 : 0.88;
      const newScale = newBaseScale * newMarginFactor;

      planeMesh.geometry.dispose();
      planeMesh.geometry = new THREE.PlaneGeometry(
        newVisibleHeight * imageAspectRatio * newScale,
        newVisibleHeight * newScale,
        64,
        64
      );
    };

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      if (!isMounted) return;

      imageAspectRatio = img.width / img.height;
      const { width, height } = container.getBoundingClientRect();

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
      camera.position.z = 10;

      fovRad = THREE.MathUtils.degToRad(camera.fov / 2);
      const visibleHeight = 2 * Math.tan(fovRad) * camera.position.z;
      const visibleWidth = visibleHeight * (width / height);

      const marginFactor = window.innerWidth < 768 ? 1.0 : 0.88;
      const baseScale = Math.min(
        visibleWidth / (visibleHeight * imageAspectRatio),
        1
      );
      const scale = baseScale * marginFactor;
      const planeWidth = visibleHeight * imageAspectRatio * scale;
      const planeHeight = visibleHeight * scale;

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
      });
      renderer.setClearColor(0xffffff, 1);
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const textureLoader = new THREE.TextureLoader();
      texture = textureLoader.load(imageUrl);
      texture.colorSpace = THREE.LinearSRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;

      planeGeo = new THREE.PlaneGeometry(planeWidth, planeHeight, 64, 64);
      planeMat = new THREE.MeshBasicMaterial({
        map: texture,
      });
      planeMesh = new THREE.Mesh(planeGeo, planeMat);
      scene.add(planeMesh);

      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));

      const effectShader = {
        uniforms: {
          tDiffuse: { value: null },
          resolution: { value: new THREE.Vector2(width, height) },
          uMouse: { value: followMouse },
          uVelo: { value: 0 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D tDiffuse;
          uniform vec2 resolution;
          uniform vec2 uMouse;
          uniform float uVelo;
          varying vec2 vUv;

          void main() {
            vec2 uv = vUv;
            vec2 disp = uMouse - uv;
            float len = length(disp);
            float strength = 0.45;
            if (len > 0.0001) {
              uv += (disp / len) * strength * uVelo * smoothstep(0.24, 0.0, len);
            }
            gl_FragColor = texture2D(tDiffuse, uv);
          }
        `,
      };

      customPass = new ShaderPass(effectShader);
      composer.addPass(customPass);

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseleave', onMouseLeave);
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('resize', onResize);

      const animate = () => {
        if (!isMounted) return;
        animationFrameId = requestAnimationFrame(animate);

        const dx = mouse.x - prevMouse.x;
        const dy = mouse.y - prevMouse.y;
        currentSpeed = Math.sqrt(dx * dx + dy * dy);

        targetSpeed -= 0.1 * (targetSpeed - currentSpeed);
        followMouse.x -= 0.1 * (followMouse.x - mouse.x);
        followMouse.y -= 0.1 * (followMouse.y - mouse.y);
        prevMouse.copy(mouse);

        customPass.uniforms.uMouse.value.copy(followMouse);
        customPass.uniforms.uVelo.value = Math.min(targetSpeed * 3, 1.0);
        targetSpeed *= 0.95;

        composer.render();
      };

      animate();
    };

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);

      if (planeMesh) {
        if (planeMesh.geometry) planeMesh.geometry.dispose();
      }
      if (planeGeo) planeGeo.dispose();
      if (planeMat) planeMat.dispose();
      if (texture) texture.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col justify-center items-start md:items-center"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="w-full max-w-[330px] px-0 md:px-5 mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-zinc-600 relative z-10">
        <Link to="/work">
          Work
        </Link>
        <Link to="/projects">
          Projects
        </Link>
        <Link to="/hackthons">
          Hackathons
        </Link>
        <Link to="/writings">
          Writings
        </Link>
        <Link to="/reading">
          Reading
        </Link>
        <Link to="/notes.md">
          Notes
        </Link>
        <a
          href="https://adimail.github.io/movies/"
          target="_blank"
          rel="noreferrer"
        >
          Movies
        </a>
        <Link to="/about">
          About
        </Link>
      </div>
    </div>
  );
};

