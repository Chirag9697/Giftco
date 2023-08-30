const mongoose=require('mongoose');
const {Schema}=mongoose;
const User=require('./user');
const trackschema=new Schema({
    nameofgift:{
        type:String
    },
    price:{
        type:String
    },
    towhom:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
    },
    
})
const Gift=mongoose.model('Trackschema',trackschema);
module.exports=Gift;
