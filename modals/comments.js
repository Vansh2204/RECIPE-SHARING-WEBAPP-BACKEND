const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    UserComment:{
        type:String,
    },
    Userinfo:{
        username:{
            type:String,
            required:true
        },
        picture:{
            type:String,
            required:true
        }
    }
},{timestamps:true})

const usercomment = mongoose.model('Comment',commentSchema)
module.exports = usercomment;