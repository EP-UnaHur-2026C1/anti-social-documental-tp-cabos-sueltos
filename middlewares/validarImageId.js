const Post = require("../models/Post.js");

const validarImageId = async (req, res, next) => {
  try {
    const { id, imageId } = req.params;
    const post = req.post; // el post viene del middleware validarPostId
    const imagen = post.imagenes.find((img) => img._id.toString() === imageId);
    if (!imagen) {
      return res.status(404).json({ message: "Imagen no encontrada" });
    }
    req.imagen = imagen;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al validar el ID de la imagen" });
  }
};

module.exports = validarImageId;
