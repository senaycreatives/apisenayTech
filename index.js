const bott = '6795594212:AAH_HoH1rlhQ_u4xsnkRp0o2NorK46YZ6CY';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = process.env.PORT || 3300;

app.use(cors());
app.use(bodyParser.json());

const telegramGroupChatId = '-891865410';

const bot = new TelegramBot(bott, { polling: true });

app.post('/message', (req, res) => {
    const { message } = req.body;
    console.log(message);

    const messageToSend = `
        Hey buddy, we have *New Customer*:

        *What kind of website/app/bot do you like us to build?*:
        *${message.whatDoYouLike}*

        *Give me your Email Address*:
        *${message.email}*

        *Who do we call you?*:
        *${message.caller}*

        *Any additional info to tell?*:
        *${message.additionalInfo}*
    `;

    bot.sendMessage(telegramGroupChatId, messageToSend, { parse_mode: 'Markdown' })
        .then(() => {
            res.status(200).json({ message: 'Message sent successfully!' });
        
        })
        .catch((error) => {
            console.error('Error sending message to Telegram:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
