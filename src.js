const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("Camera",
        -Math.PI / 2,
        Math.PI / 2,
        10,
        new BABYLON.Vector3(0, 0, 0),
        scene);
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Загрузка модели
    BABYLON.SceneLoader.ImportMesh("",
        "",  // путь к модели, если она в том же каталоге, что и index.html
        "untitled.glb", // имя файла модели 
        scene,
        function (meshes) {
            const model = meshes[0];
            // Масштабирование и позиционирование по необходимости
            // model.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1); 
            // model.position.y = -1; 
        });

    // Обработка свайпа
    let previousPosition = null;
    scene.onPointerDown = (evt) => {
        previousPosition = {
            x: evt.clientX,
            y: evt.clientY
        };
    };

    scene.onPointerMove = (evt) => {
        if (!previousPosition) {
            return;
        }

        let deltaX = (evt.clientX - previousPosition.x) * 0.01;

        camera.alpha += deltaX;

        previousPosition = {
            x: evt.clientX,
            y: evt.clientY
        };
    };

    scene.onPointerUp = () => {
        previousPosition = null;
    };

    return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});

// Остальной код (счетчик) остается прежним
const scoreValue = document.getElementById('score-value');
let score = localStorage.getItem('score') || 0;
scoreValue.textContent = score;

canvas.addEventListener('click', () => {
    score++;
    localStorage.setItem('score', score);
    scoreValue.textContent = score;
});
```