
const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://farzanaycet2009:FarzanaAtlas@cluster0.addaymv.mongodb.net/todoproject?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to db')
})
.catch((e)=>{
    console.log('error connected to db');
})