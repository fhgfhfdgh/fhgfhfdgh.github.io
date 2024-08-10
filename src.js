
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

// Получаем элемент Canvas, где будет отображаться сцена
const canvas = document.getElementById("renderCanvas");

// Создаем движок Babylon.js
const engine = new BABYLON.Engine(canvas, true);

// Функция для создания сцены
const createScene = function () {
    // Создаем сцену
    const scene = new BABYLON.Scene(engine);
    scene.autoClear = true;
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 1); // R, G, B, A 

    
    // Создаем камеру и задаем ее позицию
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        -Math.PI / 2,
        Math.PI / 2,
        10,
        new BABYLON.Vector3(0, 0, 0),
        scene
    );


    // ОТКЛЮЧАЕМ ПРИБЛИЖЕНИЕ/ОТДАЛЕНИЕ:
    camera.inputs.attached.mousewheel.detachControl();
    camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius;
    camera.attachControl(canvas, true);

 

    // Создаем источник света
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );


    let particleSystem;
    

    // Загружаем 3D-модель
    let model; 
    BABYLON.SceneLoader.ImportMesh(
        "",
        "", 
        "untitled.glb", 
        scene,
        function (meshes) {
            const model = meshes[0];

            // Создаем систему частиц
            particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
             // Источник частиц - наша модель
            particleSystem.emitter = model; 
            // Настройки частиц:
            particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, -1); // Область испускания
            particleSystem.maxEmitBox = new BABYLON.Vector3(1, 1, 1);
            particleSystem.color1 = new BABYLON.Color4(1, 1, 1, 0.7); // Белый с прозрачностью 0.7 (70%)
            particleSystem.minSize = 0.1;
            particleSystem.maxSize = 0.5;
            particleSystem.minLifeTime = 2; // Время жизни частицы (в секундах)
            particleSystem.maxLifeTime = 5;
            particleSystem.emitRate = 100;
            particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE; // Для полупрозрачности
            particleSystem.gravity = new BABYLON.Vector3(0, -0.01, 0); // Небольшая гравитация вниз

            // Запускаем систему частиц
            particleSystem.start(); 

      


            
        }
    );

    // Возвращаем сцену
    return scene;
};

// Вызываем функцию создания сцены
const scene = createScene();

// Запускаем игровой цикл рендеринга
engine.runRenderLoop(function () {
    scene.render();
});

// Изменяем размер движка при изменении размера окна
window.addEventListener("resize", function () {
    engine.resize();
});


