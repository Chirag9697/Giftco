const express=require('express');
const bcrypt=require('bcrypt');
const router=express.Router();
const User=require('../mongoosemodel/user');
const {createToken}=require('../authentication/auth');
// const db=require('../index');
// db.collection('Uss')
router.post('/login',async(req,res)=>{
    // console.log("hello");
    const{username,password}=req.body;
    // const col=db.collection("User");   
    const founduser=await User.findOne({username:username});
    if(founduser){
        const hash=founduser.password;  
        const found=await bcrypt.compare(password,hash);
        if(found){
            const accessToken=createToken(founduser);
            res.json({token:accessToken});
        }
        else{        
            res.status(400).json({error:"password didnt match"});
        }
    }
    else{
        res.status(400).json({error:"email doesn't exist"});
    }
})

router.post('/register',async(req,res)=>{
    const{Name,username,password}=req.body;
    console.log(req.body);
    // const col=db.collection("User");
    const hash=await bcrypt.hash(password, 10);
    if(hash){
        const finddupuser=await User.findOne({username:username});
        if(finddupuser){
            return res.status(400).send({error:"there is some error"});
        }
        const newUser=new User({username:username,password:hash,Name:Name});
        const saved=await newUser.save();
        // const saved=await newUser.save();
        console.log(saved);
        if(saved){
            return res.send({success:"successfully registered"});
        }
        else{
           return res.status(400).send({error:"user not registered"});
        }
    }
    else{

        return res.status(400).send({error:"there is some error"});
    }
})
// export default router;
module.exports=router;