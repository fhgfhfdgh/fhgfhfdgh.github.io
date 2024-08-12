let tg = window.Telegram.WebApp;
tg.expand();

const circle = document.getElementById('clickable-circle');
const scoreValue = document.getElementById('score-value');
let score = localStorage.getItem('score') || 0;
scoreValue.textContent = score;

circle.addEventListener('click', () => {
    score++;
    localStorage.setItem('score', score);
    scoreValue.textContent = score;
});

// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
const container = document.getElementById('model-container');
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);
const loader = new THREE.GLTFLoader();

let model;
loader.load(
    'untitled.glb', // Replace with your model's path
    function (gltf) {
        model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5); // Adjust scaling as needed
        scene.add(model);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

camera.position.z = 5;

// Rotate the model on mouse drag
let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};

container.addEventListener('mousedown', () => { isDragging = true; });
container.addEventListener('mouseup', () => { isDragging = false; });

container.addEventListener('mousemove', (event) => {
    if (isDragging && model) {
        const deltaMove = {
            x: event.offsetX - previousMousePosition.x,
            y: event.offsetY - previousMousePosition.y
        };

        model.rotation.y += deltaMove.x * 0.005;
        model.rotation.x += deltaMove.y * 0.005;
    }
    previousMousePosition = {
        x: event.offsetX,
        y: event.offsetY
    };
});

function animate() {
    requestAnimationFrame(animate);
    if (model) {
        // Add any animation you want here
        // Example: model.rotation.y += 0.01; 
    }
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}