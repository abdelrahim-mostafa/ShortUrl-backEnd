require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

mongoose.connect(process.env.DATABASE_URL , { useNewUrlParser : true , useUnifiedTopology: true});

const DB = mongoose.connection;

DB.on("error" , (err) => {
    console.log("connection error" ,err);
});
// make static file
app.use(express.static(path.join(__dirname , "public")));

// set middlewares 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
DB.once("open" , () => {


    // set cors
    app.use(cors())

    // set user controller
    app.use('/user' , require('./user/controller'));
    // set URL controller
    app.use('/user' , require('./urlParser/controller'));

    app.listen(process.env.PORT , (err) => {
        if(err) console.log("listen Error : " ,err);
        console.log(`http://localhost:${process.env.PORT}/`);;
    });
});