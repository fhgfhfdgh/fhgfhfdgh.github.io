const coinContainer = document.getElementById('coin-container');
const scoreDisplay = document.getElementById('score');
let score = 0;

// Проверяем наличие сохраненного счета
if (localStorage.getItem('coinScore')) {
    score = parseInt(localStorage.getItem('coinScore'), 10);
}
scoreDisplay.textContent = Монетки: ${ score };

function createCoin() {
    const coin = document.createElement('div');
    coin.classList.add('coin');
    const x = Math.random() * (window.innerWidth - 40);
    const y = Math.random() * (window.innerHeight - 40);
    coin.style.left = ${ x } px;
    coin.style.top = ${ y } px;

    coin.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = Монетки: ${ score };
        localStorage.setItem('coinScore', score); // Сохраняем счет
        coinContainer.removeChild(coin);
        createCoin(); // Создаем новую монетку
    });

    coinContainer.appendChild(coin);
}

// Создаем первую монетку
createCoin();