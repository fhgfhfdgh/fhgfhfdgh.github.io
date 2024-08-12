let tg = window.Telegram.WebApp;
tg.expand() // метод позволяет растянуть окно на всю высоту.
tg.ThemeParams.bg_color('#0C0F13');
const star = document.getElementById('star');

function updateStarPosition(x, y) {
    const offsetX = (x / window.innerWidth - 0.5) * 100; // Увеличиваем значение для большего эффекта
    const offsetY = (y / window.innerHeight - 0.5) * -30; // Меняем знак для правильного направления

    // Применяем трансформацию
    star.style.transform = 'rotateY(' + offsetX + 'deg) rotateX(' + offsetY + 'deg)';
}

document.addEventListener('mousemove', (e) => {
    updateStarPosition(e.clientX, e.clientY);
});

// Обработка касаний
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0]; // Получаем первое касание
    updateStarPosition(touch.clientX, touch.clientY);
});