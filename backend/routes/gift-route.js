const express=require('express');
const bcrypt=require('bcrypt');
const router=express.Router();
const Gift=require('../mongoosemodel/gift');

router.post('/addgift',async(req,res)=>{
    console.log("addgift")
    const{nameofgift,description,price}=req.body;
    const newGift=new Gift({nameofgift:nameofgift,description:description,price:price});
    const succ=await newGift.save();
    console.log(succ);
    if(!succ){
        res.json({failed:"gift is not added successfully"});
    }
    res.json({success:"gift is added successfully"});
})

router.get('/getallgift',async(req,res)=>{
    const allgifts=await Gift.find();
    // consoel.log(allgifts);
    if(!allgifts){
        res.json({failed:'not able to get'});
    }
    res.send(allgifts);
})

router.delete('/deletegift/:id',async(req,res)=>{
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
router.get('/getonegift/:id',async(req,res)=>{
    const{id}=req.params;
    const gift=await Gift.findById(id);
    if(!gift){
        return res.status(400).send({msg:"error"});
    }
    return res.status(200).send(gift);
})
router.patch('/updategift/:id',async(req,res)=>{
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