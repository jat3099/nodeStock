// Stock Market Portafolio App by Augusto Almeida
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;
//set handlebars middleware
app.engine('handlebars', exphbs() );
app.set('view engine', 'handlebars');

//web comment
const stuff = "Hello welcome to my stock web app";

//set handlerbar routes
app.get('/', function (req, res) {
    res.render('home', { stuff});
});

//linking the html file with the app
//this is the route for the static file ->file that dont change
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => { console.log(`Server is listening at :${PORT}`) });