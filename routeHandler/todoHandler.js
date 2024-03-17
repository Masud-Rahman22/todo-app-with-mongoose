const express = require('express');
const mongoose = require('mongoose');
const todoSchema = require('../schemas/todoSchema');
const router = express.Router();
const Todo = new mongoose.model('Todo', todoSchema)

// all todos
router.get('/', async(req,res)=>{
    
})

// one particular todo
router.get('/:id', async(req,res)=>{

})

// create one todo
router.post('/', async(req,res)=>{
    const newTodo = new Todo(req.body);
    await newTodo.save()
        .then(() => {
            res.status(200).json({
                message: "Todo was inserted successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: "There was a server side error!"
            });
        });
})

// create more than one todo
router.post('/all', async(req,res)=>{
    await Todo.insertMany(req.body)
    .then(() => {
        res.status(200).json({
            message: "Todos were inserted successfully"
        });
    })
    .catch(err => {
        res.status(500).json({
            error: "There was a server side error!"
        });
    });

})

// update a todo
router.put('/:id', async (req, res) => {
    try {
        const result = await Todo.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                status: "inactive"
            }
        }, { new: true }); 
        // new true is must otherwise updated object will not be fetched

        if (result) {
            console.log(result);
            res.status(200).json({
                message: "Todo was updated successfully"
            });
        } else {
            console.log("No document found with the specified ID");
            res.status(404).json({
                error: "Todo not found"
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "There was a server side error!"
        });
    }
});


// delete one todo
router.delete('/:id', async(req,res)=>{

})

module.exports = router;