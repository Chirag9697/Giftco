const mongoose=require('mongoose');
const {Schema}=mongoose;
const User=require('./user');
const loginschema=new Schema({
    nameofgift:{
        type:String
    },
    description:{
        type:String
    },
    forwhom:{
        type:String
    },
    price:{
        type:Number
    },
    link:{
        type:String
    },
    user:{

        type:mongoose.Schema.Types.ObjectId,ref:'User'
    },
    
})
const Gift=mongoose.model('Gift',loginschema);
module.exports=Gift;
