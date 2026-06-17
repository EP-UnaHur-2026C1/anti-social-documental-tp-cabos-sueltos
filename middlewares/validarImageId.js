const Post = require("../models/Post.js");
const postImageSchema = require("../schemas/postImages.schema.js");

const validarImageId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = req.post;
    // .id() metodo de Mongose para buscar subdocumentos de forma nativa por su _id
    const imagen = post.imagenes.id(id);

    if (!imagen) {
      return res
        .status(404)
        .json({ message: "Imagen no encontrada en este post" });
    }
    // Pasamos la imagen al req por si el controlador la necesita
    req.imagen = imagen;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al validar el ID de la imagen" });
  }
};

const validarUrl = (req, res, next) => {
  try {
    const { error, value } = postImageSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    req.imageUrl = value.url;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al validar la url" });
  }
};

module.exports = { validarImageId, validarUrl };
