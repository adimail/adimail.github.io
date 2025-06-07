import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

const heroImageEffect = {
  init() {
    this.container = document.getElementById("hero-image-wrapper");
    this.canvas = document.getElementById("hero-effect-canvas");
    if (!this.container || !this.canvas) return;

    this.imageUrl = "./adimail.png";
    this.mouse = new THREE.Vector2(-1, -1);
    this.prevMouse = new THREE.Vector2(-1, -1);
    this.followMouse = new THREE.Vector2(-1, -1);
    this.targetSpeed = 0;
    this.currentSpeed = 0;

    const img = new Image();
    img.onload = () => {
      this.imageNaturalWidth = img.width;
      this.imageNaturalHeight = img.height;
      this.setupScene();
      this.setupPostProcessing();
      this.addEventListeners();
      this.animate();
    };
    img.src = this.imageUrl;
  },

  setupScene() {
    const imageAspectRatio = this.imageNaturalWidth / this.imageNaturalHeight;
    const { width, height } = this.container.getBoundingClientRect();

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);

    const planeSize = this.getPlaneSize(imageAspectRatio);

    const baseCameraZ =
      planeSize.height /
      2 /
      Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));
    const paddingFactor = 1.3;
    this.camera.position.z = baseCameraZ * paddingFactor;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const textureLoader = new THREE.TextureLoader();
    this.texture = textureLoader.load(this.imageUrl);
    this.texture.colorSpace = THREE.LinearSRGBColorSpace;
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.wrapS = THREE.ClampToEdgeWrapping;
    this.texture.wrapT = THREE.ClampToEdgeWrapping;

    const geometry = new THREE.PlaneGeometry(
      planeSize.width,
      planeSize.height,
      64,
      64,
    );
    const material = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
    });
    this.planeMesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.planeMesh);
  },

  getPlaneSize(imageAspectRatio) {
    const referenceHeight = 10;
    return {
      height: referenceHeight,
      width: referenceHeight * imageAspectRatio,
    };
  },

  setupPostProcessing() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    const effectShader = {
      uniforms: {
        tDiffuse: { value: null },
        resolution: { value: new THREE.Vector2() },
        uMouse: { value: this.followMouse },
        uVelo: { value: 3 },
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
          float strength = 0.5;
          uv += normalize(disp) * strength * uVelo * smoothstep(0.2, 0.0, len);
          gl_FragColor = texture2D(tDiffuse, uv);
        }
      `,
    };

    this.customPass = new ShaderPass(effectShader);
    this.composer.addPass(this.customPass);

    const { width, height } = this.container.getBoundingClientRect();
    this.customPass.uniforms.resolution.value.set(width, height);
  },

  onTouchMove(event) {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      const rect = this.canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      this.mouse.x = x / rect.width;
      this.mouse.y = 1.0 - y / rect.height;
    }
  },

  onTouchStart(event) {
    this.targetSpeed = 1.0;
    this.onTouchMove(event);
  },

  addEventListeners() {
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    window.addEventListener("touchstart", this.onTouchStart.bind(this), {
      passive: true,
    });
    window.addEventListener("touchmove", this.onTouchMove.bind(this), {
      passive: true,
    });
    window.addEventListener("resize", this.onResize.bind(this));
  },

  onMouseMove(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.mouse.x = x / rect.width;
    this.mouse.y = 1.0 - y / rect.height;
  },

  onResize() {
    const { width, height } = this.container.getBoundingClientRect();
    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
    this.customPass.uniforms.resolution.value.set(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  },

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const dx = this.mouse.x - this.prevMouse.x;
    const dy = this.mouse.y - this.prevMouse.y;
    this.currentSpeed = Math.sqrt(dx * dx + dy * dy);

    this.targetSpeed -= 0.1 * (this.targetSpeed - this.currentSpeed);
    this.followMouse.x -= 0.1 * (this.followMouse.x - this.mouse.x);
    this.followMouse.y -= 0.1 * (this.followMouse.y - this.mouse.y);
    this.prevMouse.copy(this.mouse);

    this.customPass.uniforms.uMouse.value.copy(this.followMouse);
    this.customPass.uniforms.uVelo.value = Math.min(this.targetSpeed * 3, 1.0);
    this.targetSpeed *= 0.95;

    this.composer.render();
  },
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => heroImageEffect.init());
} else {
  heroImageEffect.init();
}
