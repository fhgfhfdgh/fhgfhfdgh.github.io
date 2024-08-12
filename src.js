let coinCount = 0;

document.getElementById('addCoinButton').onclick = function () {
    coinCount++;
    document.getElementById('coinCount').innerText = 'Монетки: ' + coinCount;

// Здесь можно добавить код для отправки данных на сервер или обновления состояния
};