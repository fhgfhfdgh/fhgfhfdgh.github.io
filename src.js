let tg = window.Telegram.WebApp;
tg.expand();

const viewer = new Lighthouse3D.ModelViewer({
    container: document.getElementById('modelViewer'),
    model: 'untitled.glb',
    gestures: {
        rotate: true,
        pan: false,
        zoom: false
    }
});