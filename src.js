// Сцена, камера и рендерер
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Добавляем освещение
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Загрузка модели
const loader = new THREE.GLTFLoader();
loader.load('untitled.glb', (gltf) => {
    scene.add(gltf.scene);
    gltf.scene.position.set(0, 0, 0);
}, undefined, (error) => {
    console.error(error);
});

// Управление камерой
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(0, 1, 3);
controls.enableDamping = true; // плавное движение
controls.dampingFactor = 0.25;

// Обработка изменения размера окна
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Анимация
const animate = function () {
    requestAnimationFrame(animate);
    controls.update(); // обновление управления
    renderer.render(scene, camera);
};

animate();