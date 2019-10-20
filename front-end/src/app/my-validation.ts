export class MyValidation {
    private static errors : Object = {
        required : ' is required field' ,
        minlength : ' has little character' ,
        maxlength : ' has much character' ,
        min : ' has small value' ,
        max : ' has large value' ,
        pattern : ' is not match pattern' ,
        email : 'this is not email' 
    }
    static errorMessage (error , fielname) : String{
        return `${fielname} ${this.errors[error]}`;
    }
}
