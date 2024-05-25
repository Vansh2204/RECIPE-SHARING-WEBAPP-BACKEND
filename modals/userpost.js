const mongoose = require('mongoose');

const userpostschema = mongoose.Schema(
    {
     RecipeName:{
        type:String,
        required:true
     },
     RecipeIngredients:{
        type:String,
     },
     RecipeProcess:{
        type:String
     }
    },{timestamps:true}
)

const userposts = mongoose.model('Posts',userpostschema)
module.exports = userposts;