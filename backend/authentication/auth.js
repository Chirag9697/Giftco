const jwt=require('jsonwebtoken');
const privatekey="helloman";
const User=require('../mongoosemodel/user')

const createToken=(user)=>{     
    console.log(user);
    const token=jwt.sign({Username:user.Username,password:user.password},privatekey);
    // console.log(token);
    return token;
}

const verifyToken=async(req,res,next)=>{
    const token=req.headers['token'];
    console.log(token);
    // console.log(req.cookies);
    if(!token){
        return res.status(400).json({error:"there is error"});
    }
    try{
        const decoded=jwt.verify(token,privatekey);
        const user=await User.findOne({Username:decoded.Username});
        // console.log(user);
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