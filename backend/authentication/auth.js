const jwt=require('jsonwebtoken');
const privatekey="helloman";
const User=require('../mongoosemodel/user')

const createToken=(user)=>{     
    console.log(user);
    console.log(user.username);
    const token=jwt.sign({Username:user.username,password:user.password},privatekey);
    // console.log(token);
    return token;
}

const verifyToken=async(req,res,next)=>{
    console.log("verifying token sachi");
    console.log("hello");
    const token=req.headers['token'];
    console.log(token);
    // console.log(req.cookies);
    if(!token){
        return res.status(400).json({error:"there is error"});
    }
    try{
        const decoded=jwt.verify(token,privatekey);
        console.log("usrs",decoded);
        const user=await User.findOne({username:decoded.Username});
        // console.log(user);
        // console.log("users",user);
        req.user=user;
        console.log(req.user)
        // console.log(req.user);
        if(decoded){
            req.authenticated=true;
            return next();
        }
    }catch(err){
        res.status(400).json({error:err});
    }
}

module.exports={createToken,verifyToken}