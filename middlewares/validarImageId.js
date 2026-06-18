const Post = require("../models/Post.js");
const {
  postImageSchema,
  Post_Images,
} = require("../schemas/postImage.schema.js");

const validarImageId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const imagenEntidad = await Post_Images.findById(id);
    if (!imagenEntidad) {
      return res
        .status(404)
        .json({ message: "La imagen no existe en la entidad Post_Images" });
    }

    req.imagenEntidad = imagenEntidad;

    next();
  } catch (error) {
    console.error("Error en middleware validarImageIdEntidad:", error);

    // Si meten un ID con un formato inválido (menos caracteres, etc.), Mongoose saltará al catch
    return res
      .status(500)
      .json({ message: "Error al validar el ID de la imagen en la entidad" });
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
