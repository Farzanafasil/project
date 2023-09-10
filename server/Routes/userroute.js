const express=require('express')
const router=require('express').Router();
const jwt=require("jsonwebtoken");
const { default: mongoose } = require('mongoose');
router.use(express.json());
router.use(express.urlencoded({extended:true}));
// mongoose=require('mongoose');
const userData=require('../model/user')

//get data


router.get('/user/',async(req,res)=>{
    let data=await userData.find()
    try{
        res.json(data)
    }
    catch(error){
        res.send(error.message)
    }
})
//post data
router.post('/user',async (req,res)=>{

   try {
    console.log(req.body);
    let item=req.body;
    const user= await userData(item);
    user.save(item);
    res.json({message:"Registered Sussessfully"})
    
   } catch (error) {
    console.log(error);
    res.json(error);

   }


})
router.post('/login',async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password
    console.log(email);
    console.log(password);
    const user=await userData.findOne({email});
    if(!user)
    {
        res.json({message:"User not found"})
    }
    try {
        
    if(user.password==password){
            jwt.sign({email:email,id:user._id},"key",{expiresIn:'1d'},(error,token)=>{
                if(error){
                    res.json({message:"token not generated"})

                }
                else{
                    res.json({message:"Login success",token:token,data:user})
                }
            })
            
        }
        else
        {
            res.json({message:"Login failed"})
        }
    } catch (error) {
        console.log(error);
        
    }
})



module.exports=router;