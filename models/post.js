const mongoose = require("mongoose")
const Post_Images = require("./post_images")

const postSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: true
  },
  imagenes: { // inscrustacion -- quizas no sea necesario post_images
    url: String 
  },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //referencia

},{
  timestamps: true
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post
