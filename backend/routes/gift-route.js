const express=require('express');
const bcrypt=require('bcrypt');
const router=express.Router();
const Gift=require('../mongoosemodel/gift');
const sendsms=require('../sendsms');
const Trackgift=require('../mongoosemodel/trackgift');
const{verifyToken}=require('../authentication/auth');
router.post('/sendsms',async(req,res)=>{
    const{nameofperson,trackingid,phoneno}=req.body;
    sendsms(nameofperson,trackingid,phoneno);
    res.send({"success":"message sent"});
})
router.post('/addgift',verifyToken,async(req,res)=>{
    console.log("addgift")
    const{_id}=req.user;
    const{nameofgift,description,price,towhom,link}=req.body;
    const newGift=new Gift({nameofgift:nameofgift,description:description,price:price,towhom:towhom,link:link,user:_id});
    const succ=await newGift.save();
    console.log(succ);
    if(!succ){
        res.json({failed:"gift is not added successfully"});
    }
    res.json({success:"gift is added successfully"});
})
router.post('/addtrackgift',verifyToken,async(req,res)=>{
    console.log("addtrackgift")
    const{_id}=req.user;
    const{nameofgift,price,towhom}=req.body;
    const newTrackGift=new Trackgift({nameofgift:nameofgift,price:price,towhom:towhom,user:_id});
    const succ=await newTrackGift.save();
    console.log(succ);
    if(!succ){
        res.json({failed:"gift is not added successfully"});
    }
    res.json({success:"gift is added successfully"});
})
router.get('/getalltrackgift',verifyToken,async(req,res)=>{
    console.log("gettingtrackgift")
    // const{_id}=req.user;
    // const{nameofgift,price,towhom}=req.body;
    const allTrackGift=await Trackgift.find({user:req.user._id});
    console.log(allTrackGift);
    // const succ=await newTrackGift.save();
    // console.log(succ);
    if(!allTrackGift){
        res.json({failed:"not able to get"});
    }
    res.send(allTrackGift);
})

router.get('/getallgift',verifyToken,async(req,res)=>{
    const allgifts=await Gift.find({user:req.user._id});
    // consoel.log(allgifts);
    if(!allgifts){
        res.json({failed:'not able to get'});
    }
    res.send(allgifts);
})

router.delete('/deletegift/:id',verifyToken,async(req,res)=>{
    const{id}=req.params;
    // const col=db.collection("I");
    const del=await Gift.findByIdAndDelete(id);
    // const res=await del;
    // console.log(res);
    if(!del){
        return res.status(400).send({msg:"error"});
    }
    return res.send({success:"successfully deleted"})
})
router.delete('/deletetrackgift/:id',verifyToken,async(req,res)=>{
    const{id}=req.params;
    // const col=db.collection("I");
    const del=await Trackgift.findByIdAndDelete(id);
    // const res=await del;
    // console.log(res);
    console.log("delete");
    if(!del){
        return res.status(400).send({msg:"error"});
    }
    return res.send({success:"successfully deleted"})
})
router.get('/getonegift/:id',verifyToken,async(req,res)=>{
    const{id}=req.params;
    const gift=await Gift.findById(id);
    if(!gift){
        return res.status(400).send({msg:"error"});
    }
    return res.status(200).send(gift);
})
router.put('/updategift/:id',verifyToken,async(req,res)=>{
    console.log("hello user",req.user);
    const{nameofgift,description,price}=req.body;
    const{id}=req.params;
    const updategift=await Gift.findById(id);
    updategift.nameofgift=nameofgift;
    updategift.description=description;
    updategift.price=price;
    const updated=await updategift.save();

    // console.log(update);
    console.log(updated)
    if(!updategift){
        return res.json({failed:"not updated"});
    }
    return res.json({success:"updated successfully"});
})


module.exports=router;