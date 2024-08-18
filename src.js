let tg = window.Telegram.WebApp;
tg.setHeaderColor('#000000');
tg.expand(); // метод позвол€ет раст€нуть окно на всю высоту.

const imageContainer = document.getElementById('image-container');
const image = document.getElementById('image');

function updateImagePosition(x, y) {
    const offsetX = (x / window.innerWidth - 0.5) * 100;
    const offsetY = (y / window.innerHeight - 0.5) * -30;
    imageContainer.style.transform = 'rotateY(' + offsetX + 'deg) rotateX(' + offsetY + 'deg)';
}

document.addEventListener('mousemove', (e) => {
    updateImagePosition(e.clientX, e.clientY);
});

document.addEventListener('touchmove', (e) => {
    e.preventDefault(); // ѕредотвращаем прокрутку
    const touch = e.touches[0];
    updateImagePosition(touch.clientX, touch.clientY);
});

document.addEventListener('touchend', () => {
    imageContainer.style.transform = 'rotateY(0deg) rotateX(0deg)';
});

function createSparkles() {
    for (let i = 0; i < 20; i++) { // —оздаем 20 блесток
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.width = Math.random() * 2 + 'px';
        sparkle.style.height = sparkle.style.width;
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.animationDuration = Math.random() * 1 + 1 + 's';
        document.body.appendChild(sparkle);
    }
}

createSparkles(); // —оздаем блестки при загрузке страницы
