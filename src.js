let tg = window.Telegram.WebApp;
tg.expand() // метод позволяет растянуть окно на всю высоту.

const circle = document.getElementById('clickable-circle');
const scoreValue = document.getElementById('score-value');
let score = localStorage.getItem('score') || 0;
scoreValue.textContent = score;

circle.addEventListener('click', () => {
    score++;
    localStorage.setItem('score', score);
    scoreValue.textContent = score;
});