import * as THREE from 'three';

function initializeBook(canvas) {
  const cover = canvas.dataset.cover;
  const container = canvas.parentElement;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    40,
    container.clientWidth / container.clientHeight,
    0.7,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  scene.background = null;
  camera.position.z = 10;

  // Book dimensions
  const width = 4;
  const height = 5;
  const depth = 0.3;

  // Load texture
  const textureLoader = new THREE.TextureLoader();
  const coverTexture = textureLoader.load(cover);

  const coverMaterial = new THREE.MeshBasicMaterial({ map: coverTexture });
  const sideMaterial = new THREE.MeshBasicMaterial({ color: 0x2f4f4f });

  const materials = [
    sideMaterial,
    sideMaterial,
    sideMaterial,
    sideMaterial,
    coverMaterial,
    coverMaterial,
  ];

  const bookGeometry = new THREE.BoxGeometry(width, height, depth);
  const book = new THREE.Mesh(bookGeometry, materials);
  scene.add(book);

  // Interaction variables
  let isDragging = false;
  let previousPosition = { x: 0, y: 0 };
  let dragRotation = { x: 0, y: 0, z: 0 };

  // Mouse event listeners
  canvas.addEventListener('mousedown', (event) => {
    isDragging = true;
    previousPosition.x = event.clientX;
    previousPosition.y = event.clientY;
  });

  canvas.addEventListener('mousemove', (event) => {
    if (isDragging) {
      const deltaMove = {
        x: event.clientX - previousPosition.x,
        y: event.clientY - previousPosition.y,
      };

      dragRotation.y += deltaMove.x * 0.01;
      dragRotation.x += deltaMove.y * 0.01;

      previousPosition.x = event.clientX;
      previousPosition.y = event.clientY;
    }
  });

  canvas.addEventListener('mouseup', () => {
    isDragging = false;
  });

  canvas.addEventListener('mouseleave', () => {
    isDragging = false;
  });

  // Touch event listeners
  canvas.addEventListener('touchstart', (event) => {
    isDragging = true;
    const touch = event.touches[0];
    previousPosition.x = touch.clientX;
    previousPosition.y = touch.clientY;
  });

  canvas.addEventListener('touchmove', (event) => {
    if (isDragging) {
      const touch = event.touches[0];
      const deltaMove = {
        x: touch.clientX - previousPosition.x,
        y: touch.clientY - previousPosition.y,
      };

      dragRotation.y += deltaMove.x * 0.01;
      dragRotation.x += deltaMove.y * 0.01;

      previousPosition.x = touch.clientX;
      previousPosition.y = touch.clientY;

      // Prevent scrolling while interacting with the canvas
      event.preventDefault();
    }
  });

  canvas.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Adjust canvas on resize
  function resizeCanvas() {
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', resizeCanvas);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    if (!isDragging) {
      // Auto-rotation when not dragging
      book.rotation.y += 0.01;
    } else {
      // Apply rotation from drag
      book.rotation.x += dragRotation.x;
      book.rotation.y += dragRotation.y;
      book.rotation.z += dragRotation.z;

      // Reset drag rotation after applying
      dragRotation.x = 0;
      dragRotation.y = 0;
      dragRotation.z = 0;
    }

    renderer.render(scene, camera);
  }

  resizeCanvas(); // Ensure initial fit
  animate();
}

// Initialize each canvas
document.querySelectorAll('.book-canvas').forEach((canvas) => {
  initializeBook(canvas);
});
