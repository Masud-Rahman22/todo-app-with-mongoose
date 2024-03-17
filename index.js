const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const todoHandler = require('./routeHandler/todoHandler')

app.use(express.json());

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aw2xu1p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(()=>console.log('Connected to MongoDB'))
    .catch((err)=>console.log('could not connect to MongoDB',err))

// function errorHandler(err,res,res,next){
//     if(res.headersSent){
//         return next(err);
//     }
//     res.status(500).json({error : err})
// }

app.use('/todo', todoHandler)

app.get('/', (req,res)=>{
    res.send('project is running')
})

app.listen(PORT, ()=>{
    console.log(`project is running on port ${PORT}`);
})