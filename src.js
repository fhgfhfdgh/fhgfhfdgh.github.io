
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

const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    scene.autoClear = true;
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

    // Создание камеры
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        Math.PI / 2,
        Math.PI / 2,
        10, // Начальное расстояние от модели
        new BABYLON.Vector3(0, 0, 0),
        scene
    );

    camera.attachControl(canvas, false); // Убираем возможность управления мышью

    // Ограничение перемещения камеры
    camera.lowerRadiusLimit = 10; // Минимальное расстояние до модели
    camera.upperRadiusLimit = 10; // Максимальное расстояние до модели
    camera.beta = Math.PI / 2; // Угол наклона камеры

    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

    // Создание системы частиц
    const particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

    particleSystem.particleTexture = new BABYLON.Texture("https://plitoff.ru/wp-content/uploads/2020/10/154a1de6f6795157ee1f753c43d11c3b.jpg", scene); // Текстура частиц
    particleSystem.emitter = new BABYLON.Vector3(0, 0, 0); // Позиция эмиттера (центр модели)

    particleSystem.minEmitBox = new BABYLON.Vector3(-0.5, -1, -1); // Минимальная позиция эмиттера
    particleSystem.maxEmitBox = new BABYLON.Vector3(0.5, 0.5, 1); // Максимальная позиция эмиттера

    particleSystem.color1 = new BABYLON.Color4(110, 110, 110, 0); // Цвет частиц (белый)
    particleSystem.color2 = new BABYLON.Color4(110, 110, 110, 10); // Цвет частиц (прозрачный)

    particleSystem.minSize = 0.01; // Минимальный размер частиц
    particleSystem.maxSize = 0.05; // Максимальный размер частиц

    particleSystem.emitRate = 20; // Количество частиц в секунду
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE; // Режим смешивания

    particleSystem.gravity = new BABYLON.Vector3(0, 3, 1); // Гравитация для частиц

    particleSystem.start();

    BABYLON.SceneLoader.ImportMesh("", "", "untitled.glb", scene, function (meshes) {
        const model = meshes[0];

        // Выравниваем модель по центру
        model.position.y = 0; // Поднимите или опустите модель, если необходимо

        // Устанавливаем эмиттер частиц на позицию модели
        particleSystem.emitter = model.position;
    });

    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

// Обработка изменения размера окна
window.addEventListener("resize", function () {
    engine.resize();
});
