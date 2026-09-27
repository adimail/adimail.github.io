import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Book, booksData } from '../lib/books';

const BOOK_HEIGHT = 4.4;
const BOOK_DEPTH = 3.2;
const GAP = 0.32;

function createSpineTexture(book: Book): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = book.spineColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(255, 255, 255, 0)';
  ctx.fillRect(0, 0, 14, canvas.height);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(canvas.width - 14, 0, 14, canvas.height);

  ctx.strokeStyle = book.spineTextColor;
  ctx.globalAlpha = 0.3;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(30, 40);
  ctx.lineTo(canvas.width - 30, 40);
  ctx.moveTo(30, canvas.height - 40);
  ctx.lineTo(canvas.width - 30, canvas.height - 40);
  ctx.stroke();

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(Math.PI / 2);
  ctx.globalAlpha = 1.0;
  ctx.fillStyle = book.spineTextColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = '600 38px "Newsreader", serif';
  ctx.fillText(book.title.toUpperCase(), 0, 0);

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export const Bookshelf: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeModalBook, setActiveModalBook] = useState<Book | null>(null);

  const hoveredIndexRef = useRef<number | null>(null);
  const selectedIndexRef = useRef<number | null>(null);
  const scrollXRef = useRef<number>(0);
  const targetScrollXRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let isMounted = true;
    let animationFrameId: number;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfcfcfc);

    const camera = new THREE.PerspectiveCamera(
      28,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(5, 8, 12);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.7);
    fillLight.position.set(-6, -2, 8);
    scene.add(fillLight);

    const shelfGroup = new THREE.Group();
    scene.add(shelfGroup);

    const textureLoader = new THREE.TextureLoader();
    const pagesMaterial = new THREE.MeshStandardMaterial({
      color: 0xedebe6,
      roughness: 0.9,
      metalness: 0.05
    });

    let currentX = 0;
    const rawPositions: number[] = [];
    booksData.forEach((b) => {
      rawPositions.push(currentX + b.thickness / 2);
      currentX += b.thickness + GAP;
    });

    const totalWidth = currentX - GAP;
    const basePositions: number[] = rawPositions.map((pos) => pos - totalWidth / 2);

    const minScroll = -basePositions[basePositions.length - 1];
    const maxScroll = -basePositions[0];

    const groups: THREE.Group[] = [];
    const meshes: THREE.Mesh[] = [];
    const openProgress = new Float32Array(booksData.length);
    const hoverProgress = new Float32Array(booksData.length);

    booksData.forEach((book, index) => {
      const bookGroup = new THREE.Group();
      bookGroup.position.set(basePositions[index], 0, 0);

      const coverTexture = textureLoader.load(book.coverImage);
      coverTexture.colorSpace = THREE.SRGBColorSpace;
      const spineTexture = createSpineTexture(book);

      const coverMat = new THREE.MeshStandardMaterial({
        map: coverTexture,
        roughness: 0.35,
        metalness: 0.05
      });

      const spineMat = new THREE.MeshStandardMaterial({
        map: spineTexture,
        roughness: 0.45,
        metalness: 0.05
      });

      const backMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(book.spineColor).multiplyScalar(0.7),
        roughness: 0.6
      });

      const materials = [
        coverMat,
        backMat,
        pagesMaterial,
        pagesMaterial,
        spineMat,
        pagesMaterial
      ];

      const geometry = new THREE.BoxGeometry(book.thickness, BOOK_HEIGHT, BOOK_DEPTH);
      const mesh = new THREE.Mesh(geometry, materials);
      mesh.userData = { index };

      bookGroup.add(mesh);
      shelfGroup.add(bookGroup);
      groups.push(bookGroup);
      meshes.push(mesh);
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);

    const getHitIndex = (clientX: number, clientY: number): number | null => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(meshes);
      if (intersects.length > 0) {
        return intersects[0].object.userData.index;
      }
      return null;
    };

    let isPointerDown = false;
    let dragStartX = 0;
    let dragStartScroll = 0;
    let didDrag = false;

    const clampScroll = (val: number) => {
      return Math.max(Math.min(minScroll, maxScroll), Math.min(Math.max(minScroll, maxScroll), val));
    };

    const getVisibleWorldWidth = () => {
      const vFov = THREE.MathUtils.degToRad(camera.fov);
      const visibleHeight = 2 * Math.tan(vFov / 2) * camera.position.z;
      return visibleHeight * camera.aspect;
    };

    const onPointerDown = (e: PointerEvent) => {
      isPointerDown = true;
      dragStartX = e.clientX;
      dragStartScroll = targetScrollXRef.current;
      didDrag = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isPointerDown) {
        const deltaPx = e.clientX - dragStartX;
        if (Math.abs(deltaPx) > 5) {
          didDrag = true;
        }
        const worldWidth = getVisibleWorldWidth();
        const deltaWorld = (deltaPx / canvas.clientWidth) * worldWidth;
        targetScrollXRef.current = clampScroll(dragStartScroll + deltaWorld);
      } else {
        hoveredIndexRef.current = getHitIndex(e.clientX, e.clientY);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!didDrag) {
        const hit = getHitIndex(e.clientX, e.clientY);
        if (hit === null) {
          selectedIndexRef.current = null;
        } else if (selectedIndexRef.current === hit) {
          setActiveModalBook(booksData[hit]);
        } else {
          selectedIndexRef.current = hit;
          targetScrollXRef.current = clampScroll(-basePositions[hit]);
        }
      }
      isPointerDown = false;
    };

    const onPointerLeave = () => {
      isPointerDown = false;
      mouse.set(-1000, -1000);
      hoveredIndexRef.current = null;
    };

    const onWheel = (e: WheelEvent) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!isHorizontal) {
        return;
      }
      e.preventDefault();
      const worldWidth = getVisibleWorldWidth();
      const deltaWorld = (e.deltaX / canvas.clientWidth) * worldWidth * 0.45;
      targetScrollXRef.current = clampScroll(targetScrollXRef.current - deltaWorld);
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    let lastTime = performance.now();

    const animate = (time: number) => {
      if (!isMounted) return;
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      for (let i = 0; i < booksData.length; i++) {
        const targetOpen = selectedIndexRef.current === i ? 1.0 : 0.0;
        openProgress[i] = THREE.MathUtils.damp(openProgress[i], targetOpen, 6, delta);

        const targetHover =
          hoveredIndexRef.current === i && selectedIndexRef.current !== i && openProgress[i] < 0.1
            ? 1.0
            : 0.0;
        hoverProgress[i] = THREE.MathUtils.damp(hoverProgress[i], targetHover, 8, delta);
      }

      scrollXRef.current = THREE.MathUtils.damp(
        scrollXRef.current,
        targetScrollXRef.current,
        6,
        delta
      );
      shelfGroup.position.x = scrollXRef.current;

      const extraSpacing = new Float32Array(booksData.length);
      for (let i = 0; i < booksData.length; i++) {
        const fullExpansion = BOOK_DEPTH - booksData[i].thickness + 0.35;
        extraSpacing[i] = fullExpansion * openProgress[i];
      }

      groups.forEach((group, i) => {
        let shiftX = 0;
        for (let k = 0; k < booksData.length; k++) {
          if (extraSpacing[k] > 0.001) {
            if (i < k) {
              shiftX -= extraSpacing[k] / 2;
            } else if (i > k) {
              shiftX += extraSpacing[k] / 2;
            }
          }
        }

        const pOpen = openProgress[i];
        const pHover = hoverProgress[i];

        const targetX = basePositions[i] + shiftX;
        const fullyExtendedZ = (BOOK_DEPTH - booksData[i].thickness) / 2 + 0.25;
        const forwardArc = Math.sin(pOpen * Math.PI) * 0.75;
        const targetZ = pOpen * fullyExtendedZ + forwardArc + pHover * 0.35;

        const targetRotY = -pOpen * (Math.PI / 2);
        const targetRotX = pHover * -0.12;
        const targetRotZ = pHover * 0.02;

        group.position.x = THREE.MathUtils.damp(group.position.x, targetX, 7, delta);
        group.position.y = THREE.MathUtils.damp(group.position.y, 0, 7, delta);
        group.position.z = THREE.MathUtils.damp(group.position.z, targetZ, 7, delta);

        group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetRotX, 7, delta);
        group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetRotY, 7, delta);
        group.rotation.z = THREE.MathUtils.damp(group.rotation.z, targetRotZ, 7, delta);
      });

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full select-none">
      <div
        ref={containerRef}
        className="w-full h-[480px] bg-white overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <canvas ref={canvasRef} className="w-full h-full block touch-none" />
      </div>

      {activeModalBook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          onClick={() => setActiveModalBook(null)}
        >
          <div
            className="bg-white border border-zinc-200 max-w-[620px] w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalBook(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-black text-xl leading-none cursor-pointer p-2"
              aria-label="Close"
            >
              &times;
            </button>

            <header className="mb-6">
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium">
                Reading Notes &bull; {activeModalBook.yearRead}
              </span>
              <h2 className="font-serif italic text-2xl sm:text-3xl font-normal text-black mt-1 mb-1">
                {activeModalBook.title}
              </h2>
              <p className="text-xs text-zinc-500">{activeModalBook.author}</p>
            </header>

            <hr className="h-[1px] w-full bg-zinc-100 border-0 mb-6" />

            <blockquote className="border-l-2 border-zinc-300 pl-4 space-y-4 text-zinc-800 text-sm leading-relaxed">
              {activeModalBook.notes.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </blockquote>
          </div>
        </div>
      )}
    </div>
  );
};
