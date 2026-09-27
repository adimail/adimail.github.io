import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const MobiusStrip: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let isMounted = true;
    let animationFrameId: number;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 10.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const controls = new OrbitControls(camera, canvas);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;

    const uSegments = 84;
    const vSegments = 12;
    const radius = 1.05;
    const stripWidth = 0.38;

    const positions: number[] = [];
    const indices: number[] = [];

    for (let j = 0; j <= vSegments; j++) {
      const v = -stripWidth + (2 * stripWidth * j) / vSegments;
      for (let i = 0; i <= uSegments; i++) {
        const u = (i / uSegments) * Math.PI * 2;
        const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
        const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
        const z = v * Math.sin(u / 2);
        positions.push(x, y, z);
      }
    }

    for (let j = 0; j < vSegments; j++) {
      for (let i = 0; i < uSegments; i++) {
        const a = j * (uSegments + 1) + i;
        const b = (j + 1) * (uSegments + 1) + i;
        const c = (j + 1) * (uSegments + 1) + (i + 1);
        const d = j * (uSegments + 1) + (i + 1);
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);

    const material = new THREE.MeshBasicMaterial({
      color: 0x18181b,
      wireframe: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let lastScrollY = window.scrollY;
    let scrollDelta = 0;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      scrollDelta += diff * 0.00015;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    const animate = () => {
      if (!isMounted) return;
      animationFrameId = requestAnimationFrame(animate);

      mesh.rotation.x += 0.002 + scrollDelta * 0.4;
      mesh.rotation.y += 0.003 + scrollDelta;
      mesh.rotation.z += 0.001;

      scrollDelta *= 0.88;

      controls.update();
      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      controls.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[500px] max-h-[85vh] flex items-center justify-center cursor-grab active:cursor-grabbing"
    >
      <canvas ref={canvasRef} className="w-full h-full block bg-transparent" />
    </div>
  );
};
