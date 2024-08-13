let tg = window.Telegram.WebApp;
tg.setHeaderColor('#000000');
tg.expand() // метод позволяет растянуть окно на всю высоту.


const imageContainer = document.getElementById('image-container');
const image = document.getElementById('image');
function updateImagePosition(x, y) {
    const offsetX = (x / window.innerWidth - 0.5) * 100; // Увеличиваем значение для большего эффекта
    const offsetY = (y / window.innerHeight - 0.5) * -30; // Меняем знак для правильного направления

    // Применяем трансформацию
    imageContainer.style.transform = 'rotateY(' + offsetX + 'deg) rotateX(' + offsetY + 'deg)';
}

document.addEventListener('mousemove', (e) => {
    updateImagePosition(e.clientX, e.clientY);
});

// Обработка касаний
document.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Предотвращаем прокрутку
    const touch = e.touches[0]; // Получаем первое касание
    updateImagePosition(touch.clientX, touch.clientY);
});
// Возвращаем звезду на место при отпускании пальца
document.addEventListener('touchend', () => {
    imageContainer.style.transform = 'rotateY(0deg) rotateX(0deg)';
});




imageContainer.addEventListener('mousemove', (event) => {
    const { offsetWidth, offsetHeight } = imageContainer;
    const x = event.offsetX / offsetWidth;
    const y = event.offsetY / offsetHeight;

    // Рассчитываем углы поворота
    const rotateX = (y - 0.5) * 30; // Вращение по оси X
    const rotateY = (x - 0.5) * 30; // Вращение по оси Y

    // Применяем трансформацию к изображению
    image.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
});

// Для мобильных устройств
imageContainer.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    const { offsetWidth, offsetHeight } = imageContainer;
    const x = (touch.clientX - imageContainer.offsetLeft) / offsetWidth;
    const y = (touch.clientY - imageContainer.offsetTop) / offsetHeight;

    const rotateX = (y - 0.5) * 30;
    const rotateY = (x - 0.5) * 30;

    image.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
});




// Функция для создания блесток
function createSparkles() {
    for (let i = 0; i < 20; i++) { // Создаем 20 блесток
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.width = Math.random() * 2 + 'px'; // Случайный размер
        sparkle.style.height = sparkle.style.width; // Делаем круглыми
        sparkle.style.top = Math.random() * window.innerHeight + 'px'; // Случайная позиция по вертикали
        sparkle.style.left = Math.random() * window.innerWidth + 'px'; // Случайная позиция по горизонтали
        sparkle.style.animationDuration = Math.random() * 1 + 1 + 's'; // Случайная продолжительность анимации
        document.body.appendChild(sparkle);
    }
}

createSparkles(); // Создаем блестки при загрузке страницы
