import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Link } from '@tanstack/react-router';

interface FooterProps {
  links?: boolean;
}

const CAMERA_PRESETS = [
  { theta: 0.12, phi: 1.38, radius: 9.8 },
  { theta: 0.0, phi: 1.42, radius: 16.5 },
  { theta: 0.0, phi: 0.22, radius: 12.0 },
  { theta: 0.0, phi: 1.76, radius: 10.0 },
  { theta: Math.PI / 2, phi: 1.42, radius: 10.5 },
  { theta: -Math.PI / 2, phi: 1.42, radius: 10.5 },
  { theta: Math.PI, phi: 1.45, radius: 9.8 },
  { theta: Math.PI, phi: 1.42, radius: 16.5 },
  { theta: 0.04, phi: 1.36, radius: 6.2 },
];

function makeRadialTexture(inner: string, outer: string, size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, inner);
  gradient.addColorStop(1, outer);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const Footer: React.FC<FooterProps> = ({ links = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeView, setActiveView] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let isMounted = true;
    let animationFrameId: number;
    let isVisible = false;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog(0xffffff, 25, 95);

    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      250
    );
    camera.position.set(1.5, 2.2, 9.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xd4d4d8, 1.5);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.4);
    sunLight.position.set(15, 25, 12);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xe4e4e7, 1.1);
    fillLight.position.set(-15, 6, -10);
    scene.add(fillLight);

    const underGlow = new THREE.DirectionalLight(0xffffff, 0.6);
    underGlow.position.set(0, -10, 5);
    scene.add(underGlow);

    const groundGeo = new THREE.PlaneGeometry(240, 320);
    const groundMat = new THREE.MeshBasicMaterial({ color: 0xfcfcfc });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -4.2;
    scene.add(groundMesh);

    const cloudTexture = makeRadialTexture(
      'rgba(255,255,255,0.55)',
      'rgba(255,255,255,0)',
      256
    );
    const cloudCount = 10;
    const cloudSprites: THREE.Sprite[] = [];
    const cloudSpeeds: number[] = [];
    const cloudSways: number[] = [];
    for (let i = 0; i < cloudCount; i++) {
      const cloudMat = new THREE.SpriteMaterial({
        map: cloudTexture,
        transparent: true,
        depthWrite: false,
        opacity: 0.35 + Math.random() * 0.25,
      });
      const sprite = new THREE.Sprite(cloudMat);
      const scale = 6 + Math.random() * 9;
      sprite.scale.set(scale * 1.6, scale, 1);
      sprite.position.set(
        (Math.random() - 0.5) * 70,
        4 + Math.random() * 14,
        (Math.random() - 0.5) * 90 - 20
      );
      cloudSpeeds.push(0.08 + Math.random() * 0.12);
      cloudSways.push(Math.random() * Math.PI * 2);
      cloudSprites.push(sprite);
      scene.add(sprite);
    }

    const dashCount = 50;
    const dashSpacing = 4.4;
    const dashInstancedGeo = new THREE.PlaneGeometry(0.22, 2.8);
    const dashInstancedMat = new THREE.MeshBasicMaterial({
      color: 0xd4d4d8,
      side: THREE.DoubleSide,
    });
    const dashMesh = new THREE.InstancedMesh(
      dashInstancedGeo,
      dashInstancedMat,
      dashCount
    );
    const dummy = new THREE.Object3D();

    for (let i = 0; i < dashCount; i++) {
      dummy.position.set(0, -4.18, (i - dashCount / 2) * dashSpacing);
      dummy.rotation.x = -Math.PI / 2;
      dummy.updateMatrix();
      dashMesh.setMatrixAt(i, dummy.matrix);
    }
    dashMesh.instanceMatrix.needsUpdate = true;
    scene.add(dashMesh);

    const railGeo = new THREE.PlaneGeometry(0.045, 260);
    const railMat = new THREE.MeshBasicMaterial({
      color: 0xd4d4d8,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    });
    const leftRail = new THREE.Mesh(railGeo, railMat);
    leftRail.rotation.x = -Math.PI / 2;
    leftRail.position.set(-1.7, -4.185, 0);
    scene.add(leftRail);
    const rightRail = new THREE.Mesh(railGeo, railMat);
    rightRail.rotation.x = -Math.PI / 2;
    rightRail.position.set(1.7, -4.185, 0);
    scene.add(rightRail);

    const streakCount = 130;
    const streakPositions = new Float32Array(streakCount * 6);
    const streakColors = new Float32Array(streakCount * 6);
    const streakSpeeds = new Float32Array(streakCount);

    for (let i = 0; i < streakCount; i++) {
      const x = (Math.random() - 0.5) * 32;
      const y = (Math.random() - 0.5) * 14 + 1.0;
      const z = (Math.random() - 0.5) * 90;
      const len = 1.6 + Math.random() * 2.8;

      streakSpeeds[i] = 1.0 + Math.random() * 1.4;

      const idx = i * 6;
      streakPositions[idx] = x;
      streakPositions[idx + 1] = y;
      streakPositions[idx + 2] = z;
      streakPositions[idx + 3] = x;
      streakPositions[idx + 4] = y;
      streakPositions[idx + 5] = z - len;

      const shade = 0.82 + Math.random() * 0.12;
      streakColors[idx] = shade;
      streakColors[idx + 1] = shade;
      streakColors[idx + 2] = shade;
      streakColors[idx + 3] = 0.96;
      streakColors[idx + 4] = 0.96;
      streakColors[idx + 5] = 0.96;
    }

    const streakGeo = new THREE.BufferGeometry();
    streakGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(streakPositions, 3)
    );
    streakGeo.setAttribute('color', new THREE.BufferAttribute(streakColors, 3));

    const streakMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const streakLines = new THREE.LineSegments(streakGeo, streakMat);
    scene.add(streakLines);

    const shadowTexture = makeRadialTexture(
      'rgba(0,0,0,0.32)',
      'rgba(0,0,0,0)',
      128
    );
    const shadowGeo = new THREE.PlaneGeometry(1, 1);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -4.19;
    shadowMesh.scale.set(4.4, 2.3, 1);
    scene.add(shadowMesh);

    const flightRig = new THREE.Group();
    scene.add(flightRig);

    const aircraftGroup = new THREE.Group();
    flightRig.add(aircraftGroup);

    const lightGeo = new THREE.SphereGeometry(0.04, 8, 8);

    const portMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const portMesh = new THREE.Mesh(lightGeo, portMat);
    aircraftGroup.add(portMesh);
    const portLight = new THREE.PointLight(0xef4444, 2.5, 4, 2);
    aircraftGroup.add(portLight);

    const stbdMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const stbdMesh = new THREE.Mesh(lightGeo, stbdMat);
    aircraftGroup.add(stbdMesh);
    const stbdLight = new THREE.PointLight(0x10b981, 2.5, 4, 2);
    aircraftGroup.add(stbdLight);

    const strobeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const strobeMesh = new THREE.Mesh(lightGeo, strobeMat);
    aircraftGroup.add(strobeMesh);
    const strobeLight = new THREE.PointLight(0xffffff, 0, 8, 2);
    aircraftGroup.add(strobeLight);

    let wingX = 3.2;
    let wingY = 0.15;
    let wingZ = 0.8;

    let planeModel: THREE.Object3D | null = null;
    let modelBaseScale = 1;
    let modelLoadedAt: number | null = null;

    const ribbonPoints = 75;
    const ribbonGeoLeft = new THREE.BufferGeometry();
    const ribbonGeoRight = new THREE.BufferGeometry();
    const leftRibbonPositions = new Float32Array(ribbonPoints * 3);
    const rightRibbonPositions = new Float32Array(ribbonPoints * 3);
    const leftRibbonColors = new Float32Array(ribbonPoints * 3);
    const rightRibbonColors = new Float32Array(ribbonPoints * 3);

    const leftHistory: THREE.Vector3[] = [];
    const rightHistory: THREE.Vector3[] = [];

    for (let i = 0; i < ribbonPoints; i++) {
      leftHistory.push(new THREE.Vector3(-wingX, wingY, wingZ + i * 0.45));
      rightHistory.push(new THREE.Vector3(wingX, wingY, wingZ + i * 0.45));

      const ratio = i / (ribbonPoints - 1);
      const intensity = 0.28 + ratio * 0.70;

      leftRibbonColors[i * 3] = intensity;
      leftRibbonColors[i * 3 + 1] = intensity;
      leftRibbonColors[i * 3 + 2] = Math.min(1.0, intensity + 0.04);

      rightRibbonColors[i * 3] = intensity;
      rightRibbonColors[i * 3 + 1] = intensity;
      rightRibbonColors[i * 3 + 2] = Math.min(1.0, intensity + 0.04);
    }

    ribbonGeoLeft.setAttribute(
      'position',
      new THREE.BufferAttribute(leftRibbonPositions, 3)
    );
    ribbonGeoLeft.setAttribute(
      'color',
      new THREE.BufferAttribute(leftRibbonColors, 3)
    );

    ribbonGeoRight.setAttribute(
      'position',
      new THREE.BufferAttribute(rightRibbonPositions, 3)
    );
    ribbonGeoRight.setAttribute(
      'color',
      new THREE.BufferAttribute(rightRibbonColors, 3)
    );

    const ribbonMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.NormalBlending,
    });

    const leftRibbon = new THREE.Line(ribbonGeoLeft, ribbonMat);
    const rightRibbon = new THREE.Line(ribbonGeoRight, ribbonMat);
    scene.add(leftRibbon);
    scene.add(rightRibbon);

    const loader = new GLTFLoader();
    loader.load('/747.glb', (gltf) => {
      if (!isMounted) return;
      const model = gltf.scene;
      model.rotation.y = Math.PI;

      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          if (mesh.material) {
            const mats = Array.isArray(mesh.material)
              ? mesh.material
              : [mesh.material];
            mats.forEach((mat) => {
              if ('roughness' in mat) {
                (mat as THREE.MeshStandardMaterial).roughness = 0.35;
              }
              if ('metalness' in mat) {
                (mat as THREE.MeshStandardMaterial).metalness = 0.15;
              }
              mat.needsUpdate = true;
            });
          }
        }
      });

      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      const targetSpan = 6.4;
      const scale = targetSpan / Math.max(size.x, size.z);
      model.scale.setScalar(scale);

      model.position.x = -center.x * scale;
      model.position.y = -center.y * scale;
      model.position.z = -center.z * scale;

      const fittedBox = new THREE.Box3().setFromObject(model);
      wingX = fittedBox.max.x * 0.95;
      wingY = fittedBox.min.y + (fittedBox.max.y - fittedBox.min.y) * 0.30;
      wingZ = fittedBox.max.z * 0.44;

      const tailTopY = fittedBox.max.y * 0.92;
      const tailZ = fittedBox.max.z * 0.95;

      portMesh.position.set(-wingX, wingY, wingZ);
      portLight.position.copy(portMesh.position);

      stbdMesh.position.set(wingX, wingY, wingZ);
      stbdLight.position.copy(stbdMesh.position);

      strobeMesh.position.set(0, tailTopY, tailZ);
      strobeLight.position.copy(strobeMesh.position);

      modelBaseScale = scale;
      model.scale.setScalar(scale * 0.001);
      planeModel = model;
      modelLoadedAt = clock.getElapsedTime();

      aircraftGroup.add(model);
    });

    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      velX: 0,
      velY: 0,
      lastClientX: 0,
      lastClientY: 0,
      speed: 0,
    };

    const targetPos = new THREE.Vector3(0, 0, 0);
    const currentPos = new THREE.Vector3(0, 0, 0);

    let presetIndex = 0;

    let isPointerDown = false;
    let dragStartX = 0;
    let dragStartY = 0;

    let initialPinchDistance = 0;
    let pinchStartRadius = 0;
    const activeTouches = new Map<number, { clientX: number; clientY: number }>();

    let baseRadius = CAMERA_PRESETS[0].radius;
    let basePhi = CAMERA_PRESETS[0].phi;
    let baseTheta = CAMERA_PRESETS[0].theta;

    let targetRadius = baseRadius;
    let currentRadius = baseRadius;
    let targetPhi = basePhi;
    let currentPhi = basePhi;
    let targetTheta = baseTheta;
    let currentTheta = baseTheta;
    let dragStartTheta = baseTheta;
    let dragStartPhi = basePhi;

    const applyPreset = (index: number) => {
      presetIndex = index;
      const preset = CAMERA_PRESETS[presetIndex];
      baseTheta = preset.theta;
      basePhi = preset.phi;
      baseRadius = preset.radius;
      targetTheta = preset.theta;
      targetPhi = preset.phi;
      targetRadius = preset.radius;
      setActiveView(presetIndex);
    };

    const cycleView = () => {
      applyPreset((presetIndex + 1) % CAMERA_PRESETS.length);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        activeTouches.set(e.pointerId, { clientX: e.clientX, clientY: e.clientY });

        if (activeTouches.size === 2) {
          const touches = Array.from(activeTouches.values());
          const dx = touches[0].clientX - touches[1].clientX;
          const dy = touches[0].clientY - touches[1].clientY;
          initialPinchDistance = Math.hypot(dx, dy);
          pinchStartRadius = targetRadius;

          dragStartX = (touches[0].clientX + touches[1].clientX) / 2;
          dragStartY = (touches[0].clientY + touches[1].clientY) / 2;
          dragStartTheta = targetTheta;
          dragStartPhi = targetPhi;
          isPointerDown = true;
        } else {
          isPointerDown = false;
        }
        return;
      }

      isPointerDown = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      dragStartTheta = targetTheta;
      dragStartPhi = targetPhi;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        if (!activeTouches.has(e.pointerId)) return;
        activeTouches.set(e.pointerId, { clientX: e.clientX, clientY: e.clientY });

        if (activeTouches.size >= 2) {
          if (e.cancelable) {
            e.preventDefault();
          }
          const touches = Array.from(activeTouches.values());
          const midX = (touches[0].clientX + touches[1].clientX) / 2;
          const midY = (touches[0].clientY + touches[1].clientY) / 2;

          const dx = midX - dragStartX;
          const dy = midY - dragStartY;

          targetTheta = dragStartTheta - dx * 0.0035;
          targetPhi = Math.max(
            0.2,
            Math.min(Math.PI - 0.1, dragStartPhi + dy * 0.0035)
          );

          const currentPinchDistance = Math.hypot(
            touches[0].clientX - touches[1].clientX,
            touches[0].clientY - touches[1].clientY
          );

          if (initialPinchDistance > 0) {
            const pinchRatio = initialPinchDistance / currentPinchDistance;
            targetRadius = Math.max(5.0, Math.min(22.0, pinchStartRadius * pinchRatio));
          }
        }
        return;
      }

      if (isPointerDown) {
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;

        targetTheta = dragStartTheta - dx * 0.0035;
        targetPhi = Math.max(
          0.2,
          Math.min(Math.PI - 0.1, dragStartPhi + dy * 0.0035)
        );
      } else {
        const rect = canvas.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

        pointer.targetX = Math.max(-1, Math.min(1, nx));
        pointer.targetY = Math.max(-0.8, Math.min(0.8, ny));

        const dx = e.clientX - pointer.lastClientX;
        const dy = e.clientY - pointer.lastClientY;
        pointer.lastClientX = e.clientX;
        pointer.lastClientY = e.clientY;

        const dist = Math.sqrt(dx * dx + dy * dy);
        pointer.speed = Math.min(dist / 30, 0.8);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        activeTouches.delete(e.pointerId);
        if (activeTouches.size < 2) {
          isPointerDown = false;
          initialPinchDistance = 0;
        }
        return;
      }
      isPointerDown = false;
    };

    const onPointerLeave = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        activeTouches.delete(e.pointerId);
        if (activeTouches.size < 2) {
          isPointerDown = false;
          initialPinchDistance = 0;
        }
        return;
      }
      isPointerDown = false;
      pointer.targetX = 0;
      pointer.targetY = 0;
      pointer.speed = 0;
    };

    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) {
        return;
      }
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.006;
      targetRadius = Math.max(5.0, Math.min(22.0, targetRadius + zoomDelta));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && isVisible) {
        e.preventDefault();
        cycleView();
      }
    };

    const onCustomCycle = () => {
      cycleView();
    };

    const onSetView = (e: Event) => {
      const detail = (e as CustomEvent<number>).detail;
      if (typeof detail === 'number') {
        applyPreset(detail);
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('footer-cycle-view', onCustomCycle);
    window.addEventListener('footer-set-view', onSetView);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const clock = new THREE.Clock();
    const vLeftTip = new THREE.Vector3();
    const vRightTip = new THREE.Vector3();
    const camTarget = new THREE.Vector3();

    let throttle = 1.0;

    const animate = () => {
      if (!isMounted) return;
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) {
        clock.getDelta();
        return;
      }

      const delta = Math.min(clock.getDelta(), 0.033);
      const elapsedTime = clock.getElapsedTime();

      const pointerSmoothing = 1.0 - Math.exp(-0.85 * delta);
      pointer.x += (pointer.targetX - pointer.x) * pointerSmoothing;
      pointer.y += (pointer.targetY - pointer.y) * pointerSmoothing;

      pointer.velX = pointer.targetX - pointer.x;
      pointer.velY = pointer.targetY - pointer.y;

      pointer.speed *= 0.96;

      const targetThrottle = 1.0 + pointer.speed * 0.15;
      throttle += (targetThrottle - throttle) * (1.0 - Math.exp(-0.8 * delta));

      const flightSpeed = 22 * throttle;

      for (let i = 0; i < dashCount; i++) {
        dashMesh.getMatrixAt(i, dummy.matrix);
        dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
        dummy.position.z += flightSpeed * delta;
        if (dummy.position.z > (dashCount / 2) * dashSpacing) {
          dummy.position.z -= dashCount * dashSpacing;
        }
        dummy.updateMatrix();
        dashMesh.setMatrixAt(i, dummy.matrix);
      }
      dashMesh.instanceMatrix.needsUpdate = true;

      const streakPosAttr = streakGeo.attributes.position as THREE.BufferAttribute;
      const streakArr = streakPosAttr.array as Float32Array;

      for (let i = 0; i < streakCount; i++) {
        const idx = i * 6;
        let z = streakArr[idx + 2] + flightSpeed * streakSpeeds[i] * delta;
        if (z > 22) {
          z = -70 - Math.random() * 20;
          const nx = (Math.random() - 0.5) * 32;
          const ny = (Math.random() - 0.5) * 14 + 1.0;
          streakArr[idx] = nx;
          streakArr[idx + 1] = ny;
          streakArr[idx + 3] = nx;
          streakArr[idx + 4] = ny;
        }
        const len = 1.4 * throttle;
        streakArr[idx + 2] = z;
        streakArr[idx + 5] = z - len;
      }
      streakPosAttr.needsUpdate = true;

      for (let i = 0; i < cloudCount; i++) {
        const sprite = cloudSprites[i];
        sprite.position.z += flightSpeed * cloudSpeeds[i] * 0.12 * delta;
        sprite.position.x += Math.sin(elapsedTime * 0.05 + cloudSways[i]) * 0.01;
        if (sprite.position.z > 30) {
          sprite.position.z = -90 - Math.random() * 30;
          sprite.position.x = (Math.random() - 0.5) * 70;
          sprite.position.y = 4 + Math.random() * 14;
        }
      }

      const idleFloatY = Math.sin(elapsedTime * 0.7) * 0.025;
      const idleFloatRoll = Math.sin(elapsedTime * 0.5) * 0.008;
      const idlePitch = Math.cos(elapsedTime * 0.6) * 0.006;

      targetPos.x = pointer.x * 1.25;
      targetPos.y = pointer.y * 0.45 + idleFloatY;
      targetPos.z = -(throttle - 1.0) * 0.25;

      currentPos.lerp(targetPos, 1.0 - Math.exp(-0.75 * delta));
      flightRig.position.copy(currentPos);

      shadowMesh.position.x = flightRig.position.x;
      shadowMesh.position.z = flightRig.position.z;
      const shadowPulse = 1.0 - Math.min(0.18, (throttle - 1.0) * 0.6);
      shadowMesh.scale.set(4.4 * shadowPulse, 2.3 * shadowPulse, 1);
      shadowMat.opacity = 0.85 - Math.abs(pointer.x) * 0.25;

      const targetBank = -pointer.velX * 0.35 + -pointer.x * 0.09 + idleFloatRoll;
      const targetPitch = 0.02 + pointer.y * 0.07 + (throttle - 1.0) * 0.04 + idlePitch;
      const targetYaw = pointer.velX * 0.18 + -pointer.x * 0.05;

      aircraftGroup.rotation.z = THREE.MathUtils.lerp(
        aircraftGroup.rotation.z,
        targetBank,
        1.0 - Math.exp(-0.95 * delta)
      );
      aircraftGroup.rotation.x = THREE.MathUtils.lerp(
        aircraftGroup.rotation.x,
        targetPitch,
        1.0 - Math.exp(-0.95 * delta)
      );
      aircraftGroup.rotation.y = THREE.MathUtils.lerp(
        aircraftGroup.rotation.y,
        targetYaw,
        1.0 - Math.exp(-0.95 * delta)
      );

      if (planeModel && modelLoadedAt !== null) {
        const revealProgress = Math.min(
          1,
          (elapsedTime - modelLoadedAt) / 0.9
        );
        const eased = 1 - Math.pow(1 - revealProgress, 3);
        const revealScale = modelBaseScale * (0.001 + eased * 0.999);
        planeModel.scale.setScalar(revealScale);
      }

      if (!isPointerDown) {
        targetTheta = THREE.MathUtils.lerp(targetTheta, baseTheta, 1.0 - Math.exp(-0.9 * delta));
        targetPhi = THREE.MathUtils.lerp(targetPhi, basePhi, 1.0 - Math.exp(-0.9 * delta));
        targetRadius = THREE.MathUtils.lerp(targetRadius, baseRadius, 1.0 - Math.exp(-0.9 * delta));
      }

      currentRadius = THREE.MathUtils.lerp(currentRadius, targetRadius, 1.0 - Math.exp(-1.4 * delta));
      currentPhi = THREE.MathUtils.lerp(currentPhi, targetPhi, 1.0 - Math.exp(-1.5 * delta));

      let dTheta = (targetTheta - currentTheta) % (Math.PI * 2);
      if (dTheta > Math.PI) dTheta -= Math.PI * 2;
      if (dTheta < -Math.PI) dTheta += Math.PI * 2;
      currentTheta += dTheta * (1.0 - Math.exp(-1.5 * delta));

      camTarget.x = currentPos.x * 0.55;
      camTarget.y = currentPos.y * 0.55 + 0.32;
      camTarget.z = currentPos.z - 0.3;

      const sinPhiRadius = currentRadius * Math.sin(currentPhi);
      const orbitX = camTarget.x + sinPhiRadius * Math.sin(currentTheta);
      const orbitY = Math.max(-3.5, camTarget.y + currentRadius * Math.cos(currentPhi));
      const orbitZ = camTarget.z + sinPhiRadius * Math.cos(currentTheta);

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, orbitX, 1.0 - Math.exp(-1.8 * delta));
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, orbitY, 1.0 - Math.exp(-1.8 * delta));
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, orbitZ, 1.0 - Math.exp(-1.8 * delta));

      camera.lookAt(camTarget);

      vLeftTip.set(-wingX, wingY, wingZ);
      vRightTip.set(wingX, wingY, wingZ);
      aircraftGroup.localToWorld(vLeftTip);
      aircraftGroup.localToWorld(vRightTip);

      leftHistory.unshift(vLeftTip.clone());
      leftHistory.pop();
      rightHistory.unshift(vRightTip.clone());
      rightHistory.pop();

      const leftArr = (ribbonGeoLeft.attributes.position as THREE.BufferAttribute).array as Float32Array;
      const rightArr = (ribbonGeoRight.attributes.position as THREE.BufferAttribute).array as Float32Array;

      for (let i = 0; i < ribbonPoints; i++) {
        if (i > 0) {
          leftHistory[i].z += flightSpeed * delta * 0.92;
          rightHistory[i].z += flightSpeed * delta * 0.92;
        }

        const l = leftHistory[i];
        const r = rightHistory[i];

        leftArr[i * 3] = l.x;
        leftArr[i * 3 + 1] = l.y;
        leftArr[i * 3 + 2] = l.z;

        rightArr[i * 3] = r.x;
        rightArr[i * 3 + 1] = r.y;
        rightArr[i * 3 + 2] = r.z;
      }
      (ribbonGeoLeft.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (ribbonGeoRight.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      const strobeCycle = elapsedTime % 1.25;
      const isStrobe =
        strobeCycle < 0.04 || (strobeCycle > 0.12 && strobeCycle < 0.16);
      strobeLight.intensity = isStrobe ? 6.0 : 0;
      strobeMat.color.setHex(isStrobe ? 0xffffff : 0x71717a);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();

      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('footer-cycle-view', onCustomCycle);
      window.removeEventListener('footer-set-view', onSetView);
      window.removeEventListener('resize', onResize);

      groundGeo.dispose();
      groundMat.dispose();
      cloudTexture.dispose();
      cloudSprites.forEach((sprite) => {
        (sprite.material as THREE.SpriteMaterial).dispose();
      });
      dashInstancedGeo.dispose();
      dashInstancedMat.dispose();
      railGeo.dispose();
      railMat.dispose();
      streakGeo.dispose();
      streakMat.dispose();
      shadowTexture.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      lightGeo.dispose();
      portMat.dispose();
      stbdMat.dispose();
      strobeMat.dispose();
      ribbonGeoLeft.dispose();
      ribbonGeoRight.dispose();
      ribbonMat.dispose();
      renderer.dispose();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onMobileCycle = () => {
    window.dispatchEvent(new CustomEvent('footer-cycle-view'));
  };

  const jumpToView = (index: number) => {
    window.dispatchEvent(new CustomEvent('footer-set-view', { detail: index }));
  };

  return (
    <footer className="relative w-full h-screen min-h-[600px] bg-white text-zinc-900 flex flex-col justify-between select-none overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 z-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full block touch-pan-y cursor-grab active:cursor-grabbing"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(24,24,27,0.06) 0%, rgba(24,24,27,0) 60%)',
        }}
      />

      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-56 z-[6]"
        style={{
          background:
            'linear-gradient(to bottom, #ffffff 0%, #ffffff 35%, rgba(255,255,255,0) 100%)',
        }}
      />

      <div className="relative mt-auto z-10 w-full max-w-[1100px] mx-auto px-6 pb-10 pointer-events-auto pt-5">
        <div className="flex items-center justify-center gap-2 pb-4">
          {CAMERA_PRESETS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => jumpToView(i)}
              aria-label={`Switch to view ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeView
                  ? 'w-5 bg-zinc-800'
                  : 'w-1.5 bg-zinc-300 hover:bg-zinc-400'
              }`}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 text-xs text-zinc-500">
          {links ? (
            <div className="flex items-center justify-center sm:justify-start text-center sm:text-left flex-wrap gap-x-5 gap-y-2.5">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/work">Work</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/hackthons">Hackathons</Link>
              <Link to="/writings">Writings</Link>
              <Link to="/reading">Reading</Link>
              <a
                href="https://github.com/adimail"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://x.com/adimail2404"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer">
                Resume
              </a>
              <a href="mailto:aditya.godse747@gmail.com" target="_blank" rel="noreferrer">
                Email
              </a>
            </div>
          ) : (
            <div />
          )}

          <div className="flex items-center justify-center gap-4 shrink-0 self-center sm:self-auto">
            <button
              type="button"
              onClick={onMobileCycle}
              className="sm:hidden cursor-pointer flex items-center gap-1.5 rounded-full px-3 py-1.5 text-zinc-500 hover:text-black transition-colors"
              aria-label="Switch camera view"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m16 3 4 4-4 4" />
                <path d="M20 7H4" />
                <path d="m8 21-4-4 4-4" />
                <path d="M4 17h16" />
              </svg>
            </button>

            <button
              onClick={scrollToTop}
              className="cursor-pointer text-zinc-400 hover:text-black shrink-0 transition-colors"
            >
              Back to top &uarr;
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
