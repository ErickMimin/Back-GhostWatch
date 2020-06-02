require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

/* Middle Wares */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
/* Importamos controladores */
app.use(require('./controllers/index'));

mongoose.connect('mongodb://' + process.env.MONGO_URI, (err, res) =>{
    if(err) throw err;
    console.log('Connection with mongoDB successful');
});
 
app.listen(process.env.PORT, () => {
    console.log("Server starts in port: ", process.env.PORT);
});