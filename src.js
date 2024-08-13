let tg = window.Telegram.WebApp;
tg.setHeaderColor('#000000');
tg.expand() // ����� ��������� ��������� ���� �� ��� ������.


const imageContainer = document.getElementById('image-container');
const image = document.getElementById('image');
function updateImagePosition(x, y) {
    const offsetX = (x / window.innerWidth - 0.5) * 100; // ����������� �������� ��� �������� �������
    const offsetY = (y / window.innerHeight - 0.5) * -30; // ������ ���� ��� ����������� �����������

    // ��������� �������������
    imageContainer.style.transform = 'rotateY(' + offsetX + 'deg) rotateX(' + offsetY + 'deg)';
}

document.addEventListener('mousemove', (e) => {
    updateImagePosition(e.clientX, e.clientY);
});

// ��������� �������
document.addEventListener('touchmove', (e) => {
    e.preventDefault(); // ������������� ���������
    const touch = e.touches[0]; // �������� ������ �������
    updateImagePosition(touch.clientX, touch.clientY);
});
// ���������� ������ �� ����� ��� ���������� ������
document.addEventListener('touchend', () => {
    imageContainer.style.transform = 'rotateY(0deg) rotateX(0deg)';
});




imageContainer.addEventListener('mousemove', (event) => {
    const { offsetWidth, offsetHeight } = imageContainer;
    const x = event.offsetX / offsetWidth;
    const y = event.offsetY / offsetHeight;

    // ������������ ���� ��������
    const rotateX = (y - 0.5) * 30; // �������� �� ��� X
    const rotateY = (x - 0.5) * 30; // �������� �� ��� Y

    // ��������� ������������� � �����������
    image.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
});

// ��� ��������� ���������
imageContainer.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    const { offsetWidth, offsetHeight } = imageContainer;
    const x = (touch.clientX - imageContainer.offsetLeft) / offsetWidth;
    const y = (touch.clientY - imageContainer.offsetTop) / offsetHeight;

    const rotateX = (y - 0.5) * 30;
    const rotateY = (x - 0.5) * 30;

    image.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
});




// ������� ��� �������� �������
function createSparkles() {
    for (let i = 0; i < 20; i++) { // ������� 20 �������
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.width = Math.random() * 2 + 'px'; // ��������� ������
        sparkle.style.height = sparkle.style.width; // ������ ��������
        sparkle.style.top = Math.random() * window.innerHeight + 'px'; // ��������� ������� �� ���������
        sparkle.style.left = Math.random() * window.innerWidth + 'px'; // ��������� ������� �� �����������
        sparkle.style.animationDuration = Math.random() * 1 + 1 + 's'; // ��������� ����������������� ��������
        document.body.appendChild(sparkle);
    }
}

createSparkles(); // ������� ������� ��� �������� ��������
