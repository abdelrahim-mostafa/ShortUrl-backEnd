const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    link : {
        type : String , 
        require : [true , 'link required field']
    }, 
    status : {
        type : Boolean ,
        default : true
    }, 
    owner : {
        type : mongoose.Types.ObjectId,
        require :  [true , 'Owner is required'] ,
        ref : 'User'
    },
    linkParser : {
        type : String ,
        default : urlGenrator()
    }
});

let Url = module.exports = mongoose.model('Url' , urlSchema);
function urlGenrator(){
    let url= '';
    for(let i = 0 ; i < 10 ; i++){
        url += alpha[Math.floor(Math.random()*62)];
    }
    return url;
}