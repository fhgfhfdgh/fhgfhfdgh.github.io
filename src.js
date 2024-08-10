
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

// �������� ������� Canvas, ��� ����� ������������ �����
const canvas = document.getElementById("renderCanvas");

// ������� ������ Babylon.js
const engine = new BABYLON.Engine(canvas, true);

// ������� ��� �������� �����
const createScene = function () {
    // ������� �����
    const scene = new BABYLON.Scene(engine);
    scene.autoClear = true;
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 1); // R, G, B, A 

    
    // ������� ������ � ������ �� �������
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        -Math.PI / 2,
        Math.PI / 2,
        10,
        new BABYLON.Vector3(0, 0, 0),
        scene
    );
    camera.attachControl(canvas, true);

    // ������� �������� �����
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    // ��������� 3D-������
    BABYLON.SceneLoader.ImportMesh(
        "",
        "", // ���� � ����� ������ (��������, "models/")
        "untitled.glb", // ��� ����� ������
        scene,
        function (meshes) {
            // ������������ � ������������� ������ (���� �����)
            const model = meshes[0];
            // model.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5); 
            // model.position.y = -1;
        }
    );

    // ���������� �����
    return scene;
};

// �������� ������� �������� �����
const scene = createScene();

// ��������� ������� ���� ����������
engine.runRenderLoop(function () {
    scene.render();
});

// �������� ������ ������ ��� ��������� ������� ����
window.addEventListener("resize", function () {
    engine.resize();
});


