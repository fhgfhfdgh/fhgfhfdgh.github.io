let tg = window.Telegram.WebApp;
tg.setHeaderColor('#000000');
tg.expand() // ����� ��������� ��������� ���� �� ��� ������.


const star = document.getElementById('star');

function updateStarPosition(x, y) {
    const offsetX = (x / window.innerWidth - 0.5) * 100; // ����������� �������� ��� �������� �������
    const offsetY = (y / window.innerHeight - 0.5) * -30; // ������ ���� ��� ����������� �����������

    // ��������� �������������
    star.style.transform = 'rotateY(' + offsetX + 'deg) rotateX(' + offsetY + 'deg)';
}

document.addEventListener('mousemove', (e) => {
    updateStarPosition(e.clientX, e.clientY);
});

// ��������� �������
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0]; // �������� ������ �������
    updateStarPosition(touch.clientX, touch.clientY);
});
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');

    // ������������� ������� ��������� �������
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';

    document.body.appendChild(sparkle);

    // ������� ������� ����� ��������� �����
    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

// ������� ������� ������ �������
setInterval(createSparkle, 200);
