const express = require('express');
const app = express();
const { engine }  = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

// set Handlebars
app.engine('handlebars', engine({ extname:'.handlebars', defaultlayout: "main"}));
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is otherstuff!";

// Set handlebar routes
app.get('/', (req, res) => {
    res.render('home', {
        stuff: otherstuff
    });
});


// set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT,() => console.log('Server Listening on port' + PORT));