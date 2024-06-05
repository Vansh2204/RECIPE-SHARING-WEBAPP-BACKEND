const mongoose = require('mongoose');

const userpostschema = mongoose.Schema(
   {
      RecipeName: {
         type: String,
         required: false
      },
      RecipeIngredients: {
         type: String,
      },
      RecipeProcess: {
         type: String
      },
      RecipeImage: {
         data: Buffer,
         type: String
      },
     
      userinfo: {
         username: {
            type: String,
            required: false
         },
         picture: {
            type: String,
            required: false
         }
      },
      
   }, { timestamps: true }
)

const userposts = mongoose.model('Posts', userpostschema)
module.exports = userposts;