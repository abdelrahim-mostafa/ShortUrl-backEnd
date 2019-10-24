const router = require('express')();
const jwtVerifying = require('../jwtVerify/verifying');
const Url = require('./modle/urlParser');

// add new URL shortcut
router.post('/new' , jwtVerifying.verify ,(req ,res) => {
    // set url data
    let urlData = {link : req.body.link , owner : req.auth};
    if(typeof req.body.status !== 'undefined') urlData.status = req.body.status ;
    let url = new Url(urlData);
    //add url into database
    url.save((err , data) => {
        // check the error is exist
        if(err){
            console.log(`token error : ${err}`);
            res.json({status : 'error' , error : "un-expected server error"});
        } 
        // return url data
        else res.json({status : 'done' , data});
    });
});
// update URL
router.post('/update' , jwtVerifying.verify ,(req ,res) => {
    // url data
    let urlDate = {
        link : req.body.link ,
        status : req.body.status 
    };
    //update url into database
    Url.findOneAndUpdate({_id : req.body._id , owner : req.auth} , urlDate ,(err , data) => {
        // check the error is exist
        if(err){
            console.log(`token error : ${err}`);
            res.json({status : 'error' , error : "un-expected server error"});
        } 
        // url update done
        else res.json({status : 'done'});
    });
});
// delete URL
router.delete('/delete/:_id' , jwtVerifying.verify ,(req ,res) => {
    //delete url from database
    Url.deleteOne({_id : req.params._id , owner : req.auth} ,(err , data) => {
        // check the error is exist
        if(err){
            console.log(`token error : ${err}`);
            res.json({status : 'error' , error : "un-expected server error"});
        } 
        // url delete successfuly
        else res.json({status : 'done'});
    });
});
// Get URL Data
router.get('/urlData/:_id' , jwtVerifying.verify ,(req ,res) => {
    //get url from database
    Url.findOne({_id : req.params._id , owner : req.auth} ,(err , data) => {
        // check the error is exist
        if(err){
            console.log(`token error : ${err}`);
            res.json({status : 'error' , error : "un-expected server error"});
        } 
        // get url data successfuly
        else res.json({status : 'done', data});
    });
});
// delete URL
router.get('/list' , jwtVerifying.verify ,(req ,res) => {
    //delete url from database
    Url.find({owner : req.auth} , { owner : 0 } ,(err , data) => {
        // check the error is exist
        if(err){
            console.log(`token error : ${err}`);
            res.json({status : 'error' , error : "un-expected server error"});
        } 
        // url delete successfuly
        else res.json({status : 'done' , data});
    });
});

module.exports = router;