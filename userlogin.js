const User = require('./modals/user')
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/',async(req,res)=>{
    const allusers = await User.find({});
    res.json(allusers)
});

app.post('/register',async(req,res)=>{
    try{
        const {username,email,password} = req.body
        if (!(username && email && password)) {
            res.status(400).send('Please enter all the feilds')
        }
        const existinguser = await User.findOne({ email })
        if (existinguser) {
            res.status(401).send('User already exists')
        }

        const encryptedpassword = await bcrypt.hash(password,10);

        const userinfo = await User.create({
            username,
            email,
            password:encryptedpassword
        });

        const token = jwt.sign(
            {id:userinfo._id,email},
            'shhh',
            {
                expiresIn:"2h"
            }

        );
        userinfo.token = token;
        userinfo.password = undefined;
        res.status(201).json(userinfo);



    }catch (error){
        console.log(error);

    }
});

app.post('/login',async (req,res)=>{
    try{
        const { username, password } = req.body
        if (!(username && password)) {
            res.status(400).send('Send all')

        }

        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { id: user._id },
                'shhh',
                {
                    expiresIn: "2h"
                }
            );
            user.token = token
            user.password = undefined
            res.status(200).json({ 
                success: true,   
                token   // token generated 
            })
            console.log("Logged in Succesfully")
        }



    }catch (error) {
        console.log(error)

    }

});

mongoose.connect('mongodb+srv://vanshhathirsa:tQr9YskODI3NOL4o@cluster0.othizq2.mongodb.net/JWT?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('Connected')
    app.listen(3200, () => {
        console.log('Server Started ')
    })
})

