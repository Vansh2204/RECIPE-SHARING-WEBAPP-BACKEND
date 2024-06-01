const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recipes = require('./modals/feed');
const userposts = require('./modals/userpost');
const usercomment = require('./modals/comments')
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/recipes', async (req, res) => {
    const feeds = await recipes.find({});
    res.json(feeds);
})

app.get('/recipes/:id', async (req, res) => {
    const { id } = req.params;
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

//-----------------------------------------------------------------------------------------------------------------------------------------
app.get('/posts',async(req,res)=>{
    const posts = await userposts.find({});
    res.json(posts);
})
app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const post = await userposts.findById(id); 
    res.json(post);
})

app.post('/posts',async (req,res)=>{
    const post = await userposts.create(req.body)
    res.json(post);
})

app.delete('/posts/:id', async (req, res) => {
        const { id } = req.params
        const post = await userposts.findByIdAndDelete(id);
        res.json(post);
})
//-----------------------------------------------------------------------------------------------------------------------------------------
app.get('/comments',async(req,res)=>{
    const comments = await usercomment.find({});
    res.json(comments);
})
app.post('/comments',async (req,res)=>{
    const comment = await usercomment.create(req.body)
    res.json(comment);
})

app.delete('/comment/:id', async (req, res) => {
        const { id } = req.params
        const comment = await usercomment.findByIdAndDelete(id);
        res.json(comment);
})

//-----------------------------------------------------------------------------------------------------------------------------------------

mongoose.connect('mongodb+srv://vanshhathirsa:tQr9YskODI3NOL4o@cluster0.othizq2.mongodb.net/RECIPE-API?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('Connected to Database')
    app.listen(3300, () => {
        console.log('API running on PORT 3300 !!!')
    })
})