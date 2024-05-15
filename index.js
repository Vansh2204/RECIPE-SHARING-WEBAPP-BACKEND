const express = require('express');
const mongoose = require('mongoose');
const recipes = require('./modals/feed');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/recipes',async (req,res)=>{
    const feeds = await recipes.find({});
    res.json(feeds);
})

app.get('/recipes/:id',async (req,res)=>{
    const {id} = req.params;
    const feed = await recipes.findById(id);
    res.json(feed);
})

app.post('/recipes', async (req, res) => {
    try {
        const feed = await recipes.create(req.body)
        res.json(feed)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })

    }
})

//Update data

app.put('/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const feed = await recipes.updateOne({ _id: id }, req.body);
        if (!feed) {
            return res.status(404).json({ message: `cannot find ${id}` })
        }
        const updatedEmployee = await recipes.findById(id)
        res.json(feed);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete data

app.delete('/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params
        const feed = await recipes.findByIdAndDelete(id);
        if (!feed) {
            return res.status(404).json({ message: `connot find ${id}` })
        }
        res.status(200).json(feed);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

mongoose.connect('mongodb+srv://vanshhathirsa:tQr9YskODI3NOL4o@cluster0.othizq2.mongodb.net/RECIPE-API?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('Connected to Database')
    app.listen(3300,()=>{
        console.log('API running on PORT 3300 !!!')
    })
})