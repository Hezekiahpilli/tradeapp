//  Trading App Project
 const express = require('express');
const app = express();
const { engine }  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require ('body-parser');
const PORT = process.env.PORT || 5000;



// use bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));


// API kEY pk_09830c677b0a461ba19d24bce404155e
// create call_api function 
function call_api(finishedAPI, ticker) {
request ('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_09830c677b0a461ba19d24bce404155e', {json: true }, (err, res, body) => {
    if (err) {return console.log(err);}
    if (res.statusCode === 200){
        //console.log(body);
        finishedAPI (body);
        };
    });
};



// set Handlebars
app.engine('handlebars', engine({ extname:'.handlebars', defaultlayout: "main"}));
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is otherstuff!";

// Set handlebar index routes
app.get('/', function (req, res) {
    call_api(function(doneAPI) {
          res.render('home', {
          stock: doneAPI,
        });
    },'fb');

});


// Set handlebar index POST routes
app.post('/', function (req, res) {
    call_api(function(doneAPI) {
          //posted_stuff = req.body.stock_ticker;
          res.render('home', {
          stock: doneAPI,
        //  posted_stuff: posted_stuff
        });
    }, req.body.stock_ticker);

});

// Create about route page
app.get('/about.html', function (req, res) {
    res.render('about');
});



// set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT,() => console.log('Server Listening on port' + PORT));