const coinContainer = document.getElementById('coin-container');
const scoreDisplay = document.getElementById('score');
let score = 0;

// ��������� ������� ������������ �����
if (localStorage.getItem('coinScore')) {
    score = parseInt(localStorage.getItem('coinScore'), 10);
}
scoreDisplay.textContent = �������: ${ score };

function createCoin() {
    const coin = document.createElement('div');
    coin.classList.add('coin');
    const x = Math.random() * (window.innerWidth - 40);
    const y = Math.random() * (window.innerHeight - 40);
    coin.style.left = ${ x } px;
    coin.style.top = ${ y } px;

    coin.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = �������: ${ score };
        localStorage.setItem('coinScore', score); // ��������� ����
        coinContainer.removeChild(coin);
        createCoin(); // ������� ����� �������
    });

    coinContainer.appendChild(coin);
}

// ������� ������ �������
createCoin();