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
     },
     RecipeImage:{
        data:Buffer,
        type:String
     },
     userinfo: {
      username: {
          type: String,
          required: true
      },
      picture: {
          type: String,
          required: true
      }
  }
    },{timestamps:true}
)

const userposts = mongoose.model('Posts',userpostschema)
module.exports = userposts;