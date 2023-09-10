const mongoose=require('mongoose');
const todoSchema=mongoose.Schema({
    description:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true
    }

})
const todomodel=mongoose.model('todo',todoSchema);
module.exports=todomodel;