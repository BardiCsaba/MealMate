const express = require('express'); 
const bodyParser = require('body-parser');
const session = require('express-session');
const http = require('http');
const socketio = require('socket.io');

const app = express();         
const port = 3000;                 

const server = http.createServer(app);
const io = socketio(server);

app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');

require('./routing/routes')(app, io);

app.use((err, req, res, next) => {
    res.end('Problem...');
    console.log(err);
});

server.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.json());
require('dotenv').config();


//GPT
let chatGptApi;
import('chatgpt').then((chatgpt) => {
  chatGptApi = new chatgpt.ChatGPTUnofficialProxyAPI({
    accessToken: process.env.OPENAI_ACCESS_TOKEN,
    apiReverseProxyUrl: 'https://ai.fakeopen.com/api/conversation'
  });
});

async function chatgpt(message, res) {
    if (res == undefined) {
        res = await chatGptApi.sendMessage(message);  
    } else {
        res = await chatGptApi.sendMessage(message, {
            parentMessageId: res.id,
            conversationId: res.id,
        });  
    }

    console.log('GPT-API:' + res.text);
    return res;
}

// Socket.io setup
io.on('connection', (socket) => {
  console.log('a user connected');

  let gptResponse;

  socket.on('chat message', async (msg) => {
    console.log('message: ' + msg);

    if (gptResponse == undefined) {
        gptResponse = await chatGptApi.sendMessage(msg);
    } else {
        gptResponse = await chatGptApi.sendMessage(msg, {
            parentMessageId: gptResponse.id,
            conversationId: gptResponse.conversationId
        });  
    }

    io.emit('chat message', gptResponse.text);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});  
