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
app.use(express.static("./public"));

// set middlewares 
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({extended : true, limit:'50mb'}));
DB.once("open" , () => {


    // set cors
    app.use(cors())

    // set user controller
    app.use('/user' , require('./user/controller'));
    // set URL controller
    app.use('/url' , require('./urlParser/controller'));

    // view all
    app.get('*' , (req , res) => {
        res.sendFile(path.join(__dirname , 'public/index.html'));
    });

    app.listen(process.env.PORT , (err) => {
        if(err) console.log("listen Error : " ,err);
        console.log(`http://localhost:${process.env.PORT}/`);;
    });
});