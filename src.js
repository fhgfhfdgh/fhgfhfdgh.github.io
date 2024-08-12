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
        // �������� Three.js
        await loadScript('https://threejs.org/build/three.js');

        // �������� �����, ������ � ���������
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('model-container').appendChild(renderer.domElement);

        // �������� 3D-������ (��������, � ������� glTF)
        const loader = new THREE.GLTFLoader();
        loader.load(
            'untitled.gltf',
            (gltf) => {
                const model = gltf.scene;
                scene.add(model);
            },
            undefined,
            (error) => {
                console.error('������ ��� �������� ������:', error);
            }
        );

        // ��������� ������ 
        camera.position.z = 5;

        // ������� ��������
        function animate() {
            requestAnimationFrame(animate);
            // �������� ������ 
            // model.rotation.y += 0.01; 
            renderer.render(scene, camera);
        }

        // ������ ��������
        animate();

    } catch (error) {
        console.error('������ ������������� 3D-�����:', error);
    }
}

// ������������� ����� �������� ��������
window.addEventListener('load', init3DScene);

