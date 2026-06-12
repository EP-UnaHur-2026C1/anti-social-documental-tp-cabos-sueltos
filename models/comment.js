/*El enunciado pide que el comentario tenga texto (o contenido), la fecha de realización y pertenezca a un usuario y a un post.*/ 

const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
  contenido: { type: String, required: true }, // no acepta Text
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }
},{
  timestamps: true
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment