const mongoose=require('mongoose');
const {Schema}=mongoose;
const loginschema=new Schema({
    Name:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    }
})
const User=mongoose.model('User',loginschema);
module.exports=User;
