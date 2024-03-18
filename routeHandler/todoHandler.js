const express = require('express');
const mongoose = require('mongoose');
const todoSchema = require('../schemas/todoSchema');
const router = express.Router();
const Todo = new mongoose.model('Todo', todoSchema)

// all todos
router.get('/', async (req, res) => {
    try {
        const allTodos = await Todo.find()
            .select({
                date: 0,
            })
            .limit(2)
        // select method to select specific fields, limit method for specific todo
        if (!allTodos) {
            return res.status(404).json({ message: 'No todos found' })
        }
        return res.status(200).json(allTodos)
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error!"
        });
    }
})
// all active todos
router.get('/active', async (req, res) => {
    const todo = new Todo()
    const data = await todo.findActive()
    if(data){
        res.status(200).json({
            data: data,
        })
    }
})
// all js named todos
router.get('/js', async (req, res) => {
    const data = await Todo.findJs()
    if(data){
        res.status(200).json({
            data: data,
        })
    }
})
// find by language
router.get('/language', async (req, res) => {
    const data = await Todo.find().findByLanguage('node.js')
    if(data){
        res.status(200).json({
            data: data,
        })
    }
})

// one particular todo
router.get('/:id', async (req, res) => {
    try {
        const allTodos = await Todo.find({ _id: req.params.id })
        // select method to select specific fields, limit method for specific todo
        if (!allTodos) {
            return res.status(404).json({ message: 'No todos found' })
        }
        return res.status(200).json(allTodos)
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error!"
        });
    }
})

// create one todo
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    try {
        await newTodo.save()
        res.status(200).json({
            message: "Todo was inserted successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error!"
        });
    }
})

// create more than one todo
router.post('/all', async (req, res) => {
    try {
        await Todo.insertMany(req.body);
        res.status(200).json({
            message: "Todos were inserted successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "There was a server side error!"
        });
    }
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
router.delete('/:id', async (req, res) => {
    try {
        await Todo.deleteOne({ _id: req.params.id })
        return res.status(200).json({
            message: 'todo deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error!"
        });
    }
})

module.exports = router;