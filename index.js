// Stock Market Portafolio App by Augusto Almeida
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const PORT = process.env.PORT || 5000;

 

app.engine('handlebars', exphbs() );
app.set('view engine', 'handlebars');


//web comment
const stuff = "Hello welcome to my stock web app";

//APi token pk_f434330ba373450585672d1c4b21a153

//set handlebars middleware
app.use(bodyParser.urlencoded({extended: false})); 
//call API function
function call_api(finishedApi, ticker){
	request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_f434330ba373450585672d1c4b21a153', {json: true}, (err,res, body) => {
	if(err)
		{console.log(err);}
	if(res.statusCode === 200);
	
	finishedApi(body);

});
};

//set hanlderbar index get route
//set handlerbar routes
app.get('/', function (req, res) {
    call_api(function(apiData) {
    	res.render('home', { 
    	stock: apiData
    });
    });
    
});

//set handlerbar index post route
app.post('/', function(req,res) {
	call_api(function(apiData){
		//posted = req.body.ticker
		res.render('home',{
			stock: apiData,
			
		});
	}, req.body.ticker);
});

app.get('/about.html', function (req,res)
 { res.render('about');
});

 

//linking the html file with the app
//this is the route for the static file ->file that dont change
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => { console.log(`Server is listening at :${PORT}`) });