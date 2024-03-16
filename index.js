const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

function errorHandler(err,res,res,next){
    if(res.headersSent){
        return next(err);
    }
    res.status(500).json({error : err})
}

app.get('/', (req,res)=>{
    res.send('project is running')
})

app.listen(PORT, ()=>{
    console.log(`project is running on port ${PORT}`);
})