const { Tag, Post } = require("../models");

// Obtener todos los tags existentes
const obtenerTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las etiquetas" });
  }
};

// Crear una nueva etiqueta (ej: "Programacion")

const crearTag = async (req, res) => {
  try {
    const { nombre } = req.body;

    const nuevoTag = await Tag.create({ nombre });
    return res.status(201).json(nuevoTag);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear la etiqueta" });
  }
};

// Obtener un tag específico con todos los posts que lo usan
const obtenerPostsPorTag = async (req, res) => {
  try {
    // El tag ya fue buscado y validado por el middleware, solo lo tomamos de 'req'
    const tag = req.tag;

    // Respondemos directamente
    return res.status(200).json(tag);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener los posts de la etiqueta" });
  }
};

const asignarTagAPost = async (req, res) => {
  try {
    const { id, postId } = req.params; // O de req.params si vienen por la URL

    // Buscamos el post y el tag en la base de datos
    const post = await Post.findByPk(Number(postId));
    const tag = await Tag.findByPk(Number(id));

    // Validamos que existan ambos
    if (!post || !tag) {
      return res.status(404).json({ message: "Post o Tag no encontrado" });
    }

    // Asignamos el tag al post 
    await post.addEtiqueta(tag);

    return res.status(200).json({ message: "Tag asignado con éxito al post" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  obtenerTags,
  crearTag,
  obtenerPostsPorTag,
  asignarTagAPost,
};
