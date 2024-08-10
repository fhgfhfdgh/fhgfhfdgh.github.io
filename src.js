
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

    camera.attachControl(canvas, true); // Позволяем управлять камерой

    // Ограничение перемещения камеры
    camera.lowerRadiusLimit = 10; // Минимальное расстояние до модели
    camera.upperRadiusLimit = 10; // Максимальное расстояние до модели
    camera.beta = Math.PI / 2; // Угол наклона камеры

    // Устанавливаем ограничения для beta
    camera.lowerBetaLimit = Math.PI / 2;
    camera.upperBetaLimit = Math.PI / 2;

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

    BABYLON.SceneLoader.ImportMesh("", "", "untitled.glb", scene, function (meshes) {
        const model = meshes[0];
        model.position.y = 0; // Поднимите или опустите модель, если необходимо

        // Вращение модели на мобильных устройствах
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            setInterval(() => {
                model.rotation.y += 0.01; // Скорость вращения
            }, 16); // Примерно 60 кадров в секунду
        }

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

// Отключаем управление камерой на мобильных устройствах
if (/Mobi|Android/i.test(navigator.userAgent)) {
    camera.detachControl(canvas);
}

