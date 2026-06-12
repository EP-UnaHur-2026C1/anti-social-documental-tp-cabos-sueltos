const { Post, User, Post_Images } = require("../models");

const obtenerPostImage = async (req, res) => {
  try {
    const { postId } = req.params;
    const post =  req.post
    const imagenes = await Post_Images.findAll({
      where: { postId: postId },
    });
    res.status(200).json(imagenes);
  } catch (error) {
    res.status(500).json({ message: "Error la imagen" });
  }
};

const crearPostImage = async (req, res) => {
  try {
    const { postId } = req.params;
    const { imageUrl } = req.body;
    const post =  req.post
    const imagen = await Post_Images.create({
      postId: postId,
      imageUrl: imageUrl,
    });
    res.status(201).json(imagen);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la imagen" });
  }
};

const eliminarPostImage = async (req, res) => {
  try {
    const { id } = req.params;
    const imagen = req.imagen
    await imagen.destroy();
    res.status(200).json({ message: "Imagen eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la imagen" });
  }
};

module.exports = {
  obtenerPostImage,
  crearPostImage,
  eliminarPostImage,
};
