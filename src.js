// �����, ������ � ��������
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ��������� ���������
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// �������� ������
const loader = new THREE.GLTFLoader();
loader.load('untitled.glb', (gltf) => {
    scene.add(gltf.scene);
    gltf.scene.position.set(0, 0, 0);
}, undefined, (error) => {
    console.error(error);
});

// ���������� �������
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(0, 1, 3);
controls.enableDamping = true; // ������� ��������
controls.dampingFactor = 0.25;

// ��������� ��������� ������� ����
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ��������
const animate = function () {
    requestAnimationFrame(animate);
    controls.update(); // ���������� ����������
    renderer.render(scene, camera);
};

animate();