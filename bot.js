const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

// Замените на ваш токен бота
const TOKEN = '7353092100:AAFL5Wfohw9XQoheRqcI3B0qGy_ba8LboU8';

// ID вашего канала
const CHANNEL_ID = '@OfficialVoidCoin';

// Создаем экземпляр бота
const bot = new TelegramBot(TOKEN, { polling: true });

// Создаем Express приложение
const app = express();
app.use(bodyParser.json());

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const keyboard = {
    keyboard: [
      [{ text: 'Открыть веб-приложение', web_app: { url: 'https://t.me/OfficialVoidCoin_bot?startapp' } }]
    ],
    resize_keyboard: true
  };

  bot.sendMessage(chatId, 'Привет! Нажми кнопку, чтобы открыть веб-приложение.', {
    reply_markup: keyboard
  });
});

// Эндпоинт для проверки подписки
app.post('/checkSubscription', async (req, res) => {
  const { userId, chatId } = req.body;

  try {
    const chatMember = await bot.getChatMember(CHANNEL_ID, userId);
    const isSubscribed = ['member', 'administrator', 'creator'].includes(chatMember.status);

    res.json({ isSubscribed });
  } catch (error) {
    console.error('Ошибка при проверке подписки:', error);
    res.status(500).json({ error: 'Произошла ошибка при проверке подписки' });
  }
});

// Запускаем сервер
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

console.log('Бот запущен');