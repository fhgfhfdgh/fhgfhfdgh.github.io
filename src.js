let tg = window.Telegram.WebApp;
tg.setHeaderColor('#000000');
tg.expand() // метод позволяет растянуть окно на всю высоту.


const imageContainer = document.getElementById('image-container');

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
