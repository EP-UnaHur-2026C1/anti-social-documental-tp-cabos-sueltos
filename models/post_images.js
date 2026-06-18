/*const mongoose = require("mongoose");

const post_ImagesSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Post",
    required: true
  },
  imageUrl: { 
    type: String,
    required: true
  }
}, { timestamps: true });

const Post_Images = mongoose.model("Post_Images", post_ImagesSchema);
module.exports = { Post_Images, post_ImagesSchema };

YA NO ES NECECSARIO ESTE MODELO, AHORA TODAS LAS IMAGENES SE MANEGAN DESDE EL POST
*/