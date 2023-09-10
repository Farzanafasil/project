
const morgan = require('morgan')
const express=require('express')
const cors =require('cors')

const app=express();
const PORT=5000;
const jwt=require('jsonwebtoken');
require('./DB/connection')

app.use(morgan('dev'))
app.use(cors())
const user=require('./Routes/userroute')
app.use('/api',user)
const todo=require('./Routes/todoroute')
app.use('/api',todo)

app.listen(PORT,()=>{
    console.log(`server Running on port ${PORT} `)
})
