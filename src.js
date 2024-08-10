
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
    camera.attachControl(canvas, true);

    // Создаем источник света
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    // Загружаем 3D-модель
    BABYLON.SceneLoader.ImportMesh(
        "",
        "", // Путь к вашей модели (например, "models/")
        "untitled.glb", // Имя файла модели
        scene,
        function (meshes) {
            // Масштабируем и позиционируем модель (если нужно)
            const model = meshes[0];
            // model.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5); 
            // model.position.y = -1;
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


