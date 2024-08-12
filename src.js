function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}
async function init3DScene() {
    try {
        // Загрузка Three.js
        await loadScript('https://threejs.org/build/three.js');

        // Создание сцены, камеры и рендерера
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('model-container').appendChild(renderer.domElement);

        // Загрузка 3D-модели (например, в формате glTF)
        const loader = new THREE.GLTFLoader();
        loader.load(
            'untitled.gltf',
            (gltf) => {
                const model = gltf.scene;
                scene.add(model);
            },
            undefined,
            (error) => {
                console.error('Ошибка при загрузке модели:', error);
            }
        );

        // Настройка камеры 
        camera.position.z = 5;

        // Функция анимации
        function animate() {
            requestAnimationFrame(animate);
            // Вращение модели 
            // model.rotation.y += 0.01; 
            renderer.render(scene, camera);
        }

        // Запуск анимации
        animate();

    } catch (error) {
        console.error('Ошибка инициализации 3D-сцены:', error);
    }
}

// Инициализация после загрузки страницы
window.addEventListener('load', init3DScene);

