
for (let i = 0; i < 300; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const delay = Math.random() * 10;

    star.style.left = x + 'px';
    star.style.top = y + 'px';
    star.style.animationDelay = delay + 's';

    document.body.appendChild(star);

}



const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

// Создание сцены и камеры
const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    scene.autoClear = true;
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        Math.PI / 2,
        Math.PI / 2,
        10,
        new BABYLON.Vector3(0, 0, 0),
        scene
    );

    // --- Блокировка камеры ---
    camera.attachControl(canvas, false);
    camera.lowerRadiusLimit = 10;
    camera.upperRadiusLimit = 10;
    camera.beta = Math.PI / 2;
    camera.lowerBetaLimit = Math.PI / 2;
    camera.upperBetaLimit = Math.PI / 2;
    // -------------------------

    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

    // Создание системы частиц
    const particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
    particleSystem.particleTexture = new BABYLON.Texture("https://plitoff.ru/wp-content/uploads/2020/10/154a1de6f6795157ee1f753c43d11c3b.jpg", scene);
    particleSystem.emitter = new BABYLON.Vector3(0, 0, 0);

    particleSystem.minEmitBox = new BABYLON.Vector3(-0.5, -1, -1);
    particleSystem.maxEmitBox = new BABYLON.Vector3(0.5, 0.5, 1);

    particleSystem.color1 = new BABYLON.Color4(110 / 255, 110 / 255, 110 / 255, 0);
    particleSystem.color2 = new BABYLON.Color4(110 / 255, 110 / 255, 110 / 255, 10);

    particleSystem.minSize = 0.01;
    particleSystem.maxSize = 0.05;

    particleSystem.emitRate = 20;
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    particleSystem.gravity = new BABYLON.Vector3(0, 3, 1);

    particleSystem.start();

    let model; // Храним ссылку на модель
    let initialRotationY = 0; // Начальное вращение модели

    BABYLON.SceneLoader.ImportMesh("", "", "untitled.glb", scene, function (meshes) {
        model = meshes[0];
        model.position.y = 0;
        particleSystem.emitter = model.position;

        // Блокируем положение модели
        model.position.x = 0;
        model.position.z = 0;

        initialRotationY = model.rotation.y;
    });

    // --- Обработчики событий для вращения модели ---
    canvas.addEventListener("touchstart", function (event) {
        if (event.touches.length === 1) {
            lastTouchX = event.touches[0].clientX;
        }
    });

    canvas.addEventListener("touchmove", function (event) {
        if (model) {
            event.preventDefault();
            const deltaX = event.touches[0].clientX - lastTouchX;
            model.rotation.y = initialRotationY + deltaX * 0.01;
            lastTouchX = event.touches[0].clientX;
        }
    });
    // ------------------------------------------------

    return { scene, model };
};

const { scene, model } = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});

let lastTouchX = null;

// --- Обработчики событий (Только вращение модели) ---
canvas.addEventListener("touchstart", function (event) {
    if (event.touches.length === 1) { // Только для одного пальца
        lastTouchX = event.touches[0].clientX;
    }
});

canvas.addEventListener("touchmove", function (event) {
    if (model && event.touches.length === 1) { // Вращение только при одном пальце
        event.preventDefault();
        const deltaX = event.touches[0].clientX - lastTouchX;
        model.rotation.y = initialRotationY + deltaX * 0.01;
        lastTouchX = event.touches[0].clientX;
    }
});