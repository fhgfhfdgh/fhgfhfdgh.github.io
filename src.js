
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


    // ��������� �����������/���������:
    camera.inputs.attached.mousewheel.detachControl();
    camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius;
    camera.attachControl(canvas, true);

 

    // ������� �������� �����
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );


    let particleSystem;
    

    // ��������� 3D-������
    let model; 
    BABYLON.SceneLoader.ImportMesh(
        "",
        "", 
        "untitled.glb", 
        scene,
        function (meshes) {
            const model = meshes[0];

            // ������� ������� ������
            particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
             // �������� ������ - ���� ������
            particleSystem.emitter = model; 
            // ��������� ������:
            particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, -1); // ������� ����������
            particleSystem.maxEmitBox = new BABYLON.Vector3(1, 1, 1);
            particleSystem.color1 = new BABYLON.Color4(1, 1, 1, 0.7); // ����� � ������������� 0.7 (70%)
            particleSystem.minSize = 0.1;
            particleSystem.maxSize = 0.5;
            particleSystem.minLifeTime = 2; // ����� ����� ������� (� ��������)
            particleSystem.maxLifeTime = 5;
            particleSystem.emitRate = 100;
            particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE; // ��� ����������������
            particleSystem.gravity = new BABYLON.Vector3(0, -0.01, 0); // ��������� ���������� ����

            // ��������� ������� ������
            particleSystem.start(); 

      


            
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


