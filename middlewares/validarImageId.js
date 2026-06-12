const { Post_Images } = require("../models/index");

const validarImageId = async (req, res, next) => {
 
  const { id } = req.params; 

  try {
    const imagen = await Post_Images.findByPk(id);
    if (!imagen) {
      return res.status(404).json({ message: "Imagen no encontrada" });
    }
    req.imagen = imagen; 
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error al validar el ID de la imagen" });
  }
};

module.exports = validarImageId;