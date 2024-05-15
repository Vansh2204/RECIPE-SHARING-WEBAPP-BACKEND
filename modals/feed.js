const mongoose = require('mongoose');

const feedSchema = mongoose.Schema({
    RecipeName: {
        type: String,
        required: true
    },
    RecipeIngredients: {
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