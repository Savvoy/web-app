const TelegramBot = require('node-telegram-bot-api')

const token = '';
const bot = new TelegramBot(token, {polling:true});
bot.on('message', (msg)=>{
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Received your message')
})