const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

// �������� ����� � ������
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

    // --- ���������� ������ ---
    camera.attachControl(canvas, false);
    camera.lowerRadiusLimit = 10;
    camera.upperRadiusLimit = 10;
    camera.beta = Math.PI / 2;
    camera.lowerBetaLimit = Math.PI / 2;
    camera.upperBetaLimit = Math.PI / 2;
    // ������������� ��������� ����������� ������
    camera.panningSensibility = 0; // ��������� ���������������
    camera.wheelPrecision = 0; // ��������� ���������������

    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

    // --- �������� ����� ---
    function createStar(name, size, position) {
        const star = BABYLON.MeshBuilder.CreateSphere(
            name,
            { diameter: size },
            scene
        );
        star.position = position;

        // Create a unique material for each star
        const starMaterial = new BABYLON.StandardMaterial(`starMaterial${name}`, scene);
        starMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
        star.material = starMaterial;

        // �������� �������� 
        const animation = new BABYLON.Animation(
            "starAnimation",
            "material.alpha", // Animate the material's alpha property
            40,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );

        const keys = [];
        keys.push({ frame: 0, value: 1 });     // Fully opaque
        keys.push({ frame: 15, value: 0.5 });  // Semi-transparent
        keys.push({ frame: 30, value: 1 });     // Fully opaque again

        animation.setKeys(keys);

        star.animations.push(animation);
        scene.beginAnimation(star, 0, 30, true, Math.random() * 2 - 1);
    }

    for (let i = 0; i < 300; i++) {
        const size = Math.random() * 0.2 + 0.1;
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        const z = Math.random() * 200 - 100;
        createStar("star" + i, size, new BABYLON.Vector3(x, y, z));
    }
    // �������� ������� ������
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

    let model; // ������ ������ �� ������
    let initialRotationY = 0; // ��������� �������� ������

    BABYLON.SceneLoader.ImportMesh("", "", "untitled.glb", scene, function (meshes) {
        model = meshes[0];
        model.position.y = 0;
        particleSystem.emitter = model.position;

        // ��������� ��������� ������
        model.position.x = 0;
        model.position.z = 0;

        // ��������� ����������� � ��������������� ������
        model.isPickable = false;
        // ��������� ����� �����

        initialRotationY = model.rotation.y;
    });
    // �������� �������� ������ (���� �����)
    scene.registerBeforeRender(function () {
        if (model) {
            model.rotation.y += 0.01;
        }
    });
    return { scene, model };
};

const { scene, model } = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
