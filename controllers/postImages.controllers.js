const { Post } = require("../models");


const obtenerPostImage = async (req, res) => {
  try {
    const post = req.post;
    
    res.status(200).json(post.imagenes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las imágenes" });
  }
};


const crearPostImage = async (req, res) => {
  try {
    const  url  = req.imageUrl;
    const post = req.post;

    // Agregamos el subdocumento al array de imágenes del post
    post.imagenes.push({ url });
    await post.save();
    const imagenCreada = post.imagenes[post.imagenes.length - 1];

    res.status(201).json(imagenCreada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la imagen" });
  }
};


const eliminarPostImage = async (req, res) => {
  try {
    const post = req.post;     // Traído por validarPostId
    const imagen = req.imagen; // Traído por validarImageId

    imagen.deleteOne();

    await post.save();

    res.status(200).json({ message: "Imagen eliminada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la imagen" });
  }
};
module.exports = {
  obtenerPostImage,
  crearPostImage,
  eliminarPostImage,
};