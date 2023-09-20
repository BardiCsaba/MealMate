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

app.locals.orders = [];
//GPT
let chatGptApi;
let gptResponse;
let context;
let FoodModel = require('./models/food');
let initResponse;

async function main() {
    const chatgpt = await import('chatgpt');
    chatGptApi = new chatgpt.ChatGPTUnofficialProxyAPI({
        accessToken: process.env.OPENAI_ACCESS_TOKEN,
        apiReverseProxyUrl: 'https://ai.fakeopen.com/api/conversation'
    });

    FoodModel.find({}, async (err, foods) => {
        if (err) {
            console.error(err);
            return;
        }
        const foodsStringArray = foods.map(food => `Név: ${food.name}, Leírás: ${food.description}, Ár: ${food.price} Ft`);
        
        context = "Te egy éttermi alkalmazásnak egy virtuális pincére vagy." + 
                      "A kérdésekre válaszolj a jelenlegi tudásod és a [menü] függvényében.\n" +
                      "[menü]\n" + foodsStringArray.join('\n');

        console.log("INIT:" + context);
        gptResponse = await chatGptApi.sendMessage(context);
        initResponse = gptResponse.text;
        console.log("INIT: " + initResponse);

    });

    // Socket.io setup
    io.on('connection', async (socket) => {
        console.log('a user connected');
        io.emit('chat message', gptResponse.text);

        socket.on('chat message', async (msg) => {
            console.log('message: ' + msg);

            gptResponse = await chatGptApi.sendMessage(msg, {
                parentMessageId: gptResponse.id,
                conversationId: gptResponse.conversationId
            });  

            io.emit('chat message', gptResponse.text);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on("order", async (msg) => {
            
        })
    });  
}

main().catch(console.error);
