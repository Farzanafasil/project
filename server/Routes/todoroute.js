const express=require('express')
const {default:mongoose}=require('mongoose');
const jwt=require('jsonwebtoken');

const router=require('express').Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}))
const todoList=require('../model/todo');

//get todolist

router.get('/todolist',async(req,res)=>{
    try {

        let data=await todoList.find();
        res.send(data);
        
    } catch (error) {
        res.send(error.message)
        
    }
})
router.get('/todolist/:status',async(req,res)=>{
    const { status } = req.params;
    try {
        let data= await todoList.find({status})
        res.send(data);
        
    } catch (error) {

        res.send(error.message)
        
    }
})

router.get('/todolist/:id',async(req,res)=>{
    try {
        let id=req.params.id;
        let data=await todoList.findById(id);
        console.log(data)
        res.send(data);



    } catch (error) {
        res.json({message:"not found"})
        
    }
})


//post op


router.post('/todolist',async(req,res)=>{
    try {
        // console.log(req.body);
        let data=req.body;
        const todo=await todoList(data);
        todo.save(data);
        console.log(data);
        res.json({message:"created succesfully"})

    } catch (error) {

        res.send(error);
        
    }
})

    router.delete('/todolist/:id',async(req,res)=>{
        try {
            let id = req.params.id
            console.log(id)
           const deleteItem = await todoList.findByIdAndDelete(id)
           if(!deleteItem)
           {
            res.json({message:"item not found"})
           }
           res.send({message:"Deleted successfully",deleteItem})
        } catch (error) {
            console.log(error)
            res.send('error')
        }
    })


//update todolist

router.put('/todolist/:id',async(req,res)=>{
    try {
        
        let id=req.params.id;
        const dataToUpdate={$set:req.body};
        if(!dataToUpdate)
        {
            res.json({message:"No data Found"})
        }
        const updatedData=await todoList.findByIdAndUpdate(id,dataToUpdate);

        res.send({message:"Data Updated",dataToUpdate})
        
    } catch (error) {
        res.json(error)
        
    }
})

module.exports=router;