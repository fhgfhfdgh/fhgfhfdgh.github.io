let tg = window.Telegram.WebApp;
document.addEventListener('DOMContentLoaded', () => {
    if (typeof tg !== 'undefined' && tg.ThemeParams) {
        tg.ThemeParams.secondary_bg_color('#000000'); // ������������� ������ ����
    } else {
        console.log('tg ��� tg.ThemeParams �� ����������');
    }
});

//tg.themeParams.bg_color('#33FFFF');
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