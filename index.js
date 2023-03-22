const express = require('express'); 
const bodyParser = require('body-parser');
const app = express();         
const port = 3000;                 


app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');


require('./routing/routes')(app);

app.use((err, req, res, next) => {
    res.end('Problem...');
    console.log(err);
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});

