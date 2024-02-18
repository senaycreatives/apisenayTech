const bott = '6795594212:AAH_HoH1rlhQ_u4xsnkRp0o2NorK46YZ6CY';
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const cors = require('cors');

app.use(cors());
  

const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3300;


const telegramGroupChatId = '-891865410'; 


const bot = new TelegramBot(bott, { polling: true });


const userStates = {};


io.on('connection', (socket) => {
    console.log(`Client connected with socket ID: ${socket.id}`);

   
    socket.emit('message', 'Hello! Welcome to the chat.');
    socket.emit('message', 'What kind of website do you like?');
  
    const questions = [
        'What kind of website/app/bot do you like us to build?',
        'Give me your Email Adress?',
        'Who do we call you?',
        'Any additional info To Tell?'
    ];
    let currentStep = 0;
    let userData = {};

    socket.on('message', (message) => {
     console.log(message);
        userData[questions[currentStep]] = message;

       
        currentStep++;

        if (currentStep < questions.length) {
            socket.emit('message', questions[currentStep]);
        } else {
           
const messageToSend = `
Hey buddy, we have *New Customer*:

*What kind of website/app/bot do you like us to build?*:
*${userData[questions[0]]}*

*Give me your Email Address*:
*${userData[questions[1]]}*

*Who do we call you?*:
*${userData[questions[2]]}*

*Any additional info to tell?*:
*${userData[questions[3]]}*
`;


bot.sendMessage(telegramGroupChatId, messageToSend, { parse_mode: 'Markdown' });
socket.emit('message', 'Thank you! Your message has been sent wait for an email response.');
            
            currentStep = 0;
            userData = {};
        }
    });

    socket.on('disconnect', () => {
        console.log(`Client with socket ID ${socket.id} disconnected.`);
    });
});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
