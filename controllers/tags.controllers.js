const { Tag, Post } = require("../models");

// Obtener todos los tags existentes
const obtenerTags = async (req, res) => {
  try {
    // En Mongoose se usa .find() para traer todos
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las etiquetas" });
  }
};

// Crear una nueva etiqueta
const crearTag = async (req, res) => {
  try {
    const { nombre } = req.body;

    // En Mongoose también funciona .create()
    const nuevoTag = await Tag.create({ nombre });
    return res.status(201).json(nuevoTag);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear la etiqueta" });
  }
};

const obtenerPostsPorTag = async (req, res) => {
  try {
    const tag = req.tag;

    return res.status(200).json(tag);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener los posts de la etiqueta" });
  }
};

const asignarTagAPost = async (req, res) => {
  try {
    // Tomamos el post y el tag que el middleware ya buscó y validó
    const post = req.post;
    const tag = req.tag;

    if (post.tags.includes(tag._id)) {
      return res
        .status(400)
        .json({ message: "El tag ya está asignado a este post" });
    }

    // Agregamos el ID del tag al array del Post
    post.tags.push(tag._id);

    // Guardamos los cambios en la base de datos
    await post.save();

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
