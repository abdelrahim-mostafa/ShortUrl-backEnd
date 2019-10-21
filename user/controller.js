const router = require('express')();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const jwtverifying = require('../jwtVerify/verifying');
const User = require('./modle/user');

let storage = multer.diskStorage({
    destination : './front-end/src/assets/images/',
    filename : (req ,file , cb) =>{
        cb(null , file.fieldname+'_'+Date.now()+path.extname(file.originalname));
    }
})
function myFilter(file , cb){
    let valid = /png|jpg|jpeg|gif/.test(path.extname(file.originalname.toLocaleLowerCase()));
    if(valid) cb(null , true);
	else cb("not valid file".toLocaleLowerCase() , false);
}

let fileUploder = multer({
    storage , 
    limit: '4MB',
    fileFilter : (req , file , cb) => {
        myFilter(file , cb);
    }
}).any();

router.post('/login' , (req , res) => {
    //get user by email
    User.findOne({email : req.body.email} ,(err , data) => {
        if(err) {
            console.log(`login error : ${err}`);
            res.json({status : 'Finding error' , error : err.errmsg || err.message});
        } else {
            if(!data){
                // email not exist in database
                res.json({status : 'notFound' , error : "this user not exist"});
            } else {
                //check password is correct or not
                data.comparePassword(req.body.password , data.password, (err , result) => {
                    //password not correct
                    if(err || !result) res.json({status : 'fail' , error : "password not match"});
                    // password correct
                    else {
                        // data which will convert to token
                        let tokenData = {_id : data._id};
                        // get token for one day
                        jwt.sign(tokenData , process.env.SECURTY_KEY , {expiresIn : 60 * 60 * 24 } , (err , token) => {
                            if(err){
                                console.log(`token error : ${err}`);
                                res.json({status : 'error' , error : "un-expected server error"});
                            } else res.json({status : 'done' , token , data : { fullName : `${data.firstname} ${data.lastname}` , email : data.email , profile : data.profile , cover :data.cover}});
                        });
                    }
                })
            }
        }
    });
});
router.post('/signup' , (req , res) => {
    // initilaze user object with user data
    let user = new User(req.body);
    // add user into database
    user.save((err , data) => {
        // if some data missed or not valid or any error else
        if(err) {
            console.log(`signup error : ${err}`);
            res.json({status : 'Saving error' , error : err.errmsg || err.message});
        } else {
            // user added successfuly
            res.json({status : 'done'});
        }
    });
});
router.post('/update' , jwtverifying.verify , (req , res) => {
    // set data which want to update
    let newData = { fullname : req.body.fullname , lastname : req.body.lastname , email : req.body.email};
    if(req.body.password){
        let salt = bcrypt.genSaltSync(10);
        newData.password = bcrypt.hashSync(req.body.password , salt );
    }
    // update user into database
    User.updateOne( {_id : req.auth} , newData , (err , data) => {
        // if some data missed or not valid or any error else
        if(err) {
            console.log(`signup error : ${err}`);
            res.json({status : 'Saving error' , error : err.errmsg || err.message});
        } else {
            // user added successfuly
            res.json({status : 'done'});
        }
    });
});
router.post('/uploadFile' , jwtverifying.verify , (req , res) => {
    let newData = {};
    // upload all files
    fileUploder(req ,res , (err) => {
        console.log(err);
        if(err){
            res.json({status : 'uploading error' , error : err});
        } else {
            for(file of req.files){
                newData[file.fieldname] = file.filename;
            }
            // update user into database
            User.updateOne( {_id : req.auth} , newData , (err , data) => {
                // if some data missed or not valid or any error else
                if(err) {
                    console.log(`signup error : ${err}`);
                    res.json({status : 'Saving error' , error : err.errmsg || err.message});
                } else {
                    // user added successfuly
                    res.json({status : 'done' , profile : newData['profile'] });
                }
            });  
        }
    });
});
// check if token verifyed or not
router.get('/verify' , jwtverifying.verify , (req , res) => {
    res.json({status : 'done'});
});
// check if token verifyed or not and return the user data if it verifyed
router.get('/verifyAndGetData' , jwtverifying.verifyAndGetData , (req , res) => {
    res.json({status : 'done' , data : req.auth});
});

module.exports = router;