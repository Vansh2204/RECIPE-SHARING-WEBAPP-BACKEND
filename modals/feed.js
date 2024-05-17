const mongoose = require('mongoose');

const feedSchema = mongoose.Schema({
    UserImage:{
        type:String,
        required:true

    },
    UserName:{
        type:String,
        required:true

    },
    RecipeName: {
        type: String,
        required: true
    },
    RecipeIngredients: {
        type: Array,
        required: true
    },
    RecipeProcess: {
        type: String,
        required: true
    },
    RecipeImage: {
        type: String,
        required: true
    },

},{timestamps:true})

const recipes = mongoose.model('Recipe',feedSchema)
module.exports = recipes;