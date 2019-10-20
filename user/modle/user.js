const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstname : {
        type: String , 
        required : [true , "first name required field"]
    },
    lastname : {
        type: String , 
        required : [true , "last name required field"]
    } ,
    email : {
        type: String , 
        required : [true , "email required field"],
        unique : true ,
        validate : {
            validator : (val) => /[a-zA-z0-9_\-\.]+\@[a-zA-z0-9_\-]{3,6}\.[a-zA-z]{3,5}/.test(val)
        }
    } , 
    password : {
        type: String , 
        required : [true , "password required field"],
        validate : {
            validator : (val) => /[a-zA-z0-9_\-\.\#\$\^\*\!]{6,25}/.test(val)
        }
    } , 
    profile : {
        type : String,
        default : 'profile.jpg'
    }, 
    cover : {
        type : String,
        default : 'cover.jpg'
    }, 
    date : {
        type : Date,
        default : Date.now()
    }
    
});

userSchema.pre ('save' , function (next) {
    if(!this.isModified('password')) return next();
    bcrypt.genSalt(10 , (err , salt) => {
        if(err) next(err);
        bcrypt.hash(this.password , salt , (error , hash) => {
            if(error) next(error);
            this.password = hash;
            next();
        })
    });
});

userSchema.methods.comparePassword = function (pass , hashPass , cb) {
    bcrypt.compare(pass , hashPass , (err, res) => {
        if(res) cb(null , true);
        else cb(true , false);
    })
}


let User = module.exports = mongoose.model("User" , userSchema);