const { Tag, Post } = require("../models/index");

const validarExiteTagConPosts = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Buscamos el tag y traemos sus posts asociados de una vez
    const tag = await Tag.findByPk(id, {
      include: [
        {
          model: Post,
          as: "posts",
          through: { attributes: [] }, // Oculta la tabla intermedia
        },
      ],
    });

    // Si no existe, cortamos la ejecución aquí
    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }
    req.tag = tag;

    next(); 
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al validar el ID de la etiqueta" });
  }
};

const validarNombreTag = async (req, res, next) => {
  const { nombre } = req.body;

  try {
    if (!nombre) {
      return res
        .status(400)
        .json({ message: "El nombre de la etiqueta es obligatorio" });
    }
    // Buscamos si ya existe para no duplicar
    const tagExiste = await Tag.findOne({ where: { nombre } });
    if (tagExiste) {
      return res.status(400).json({ message: "La etiqueta ya existe" });
    }
    next();
  } catch (error) {

    return res
      .status(500)
      .json({ message: "Error interno al validar la etiqueta" });
  }
};
const validarPostYTag = async (req, res, next) => {
  try {
    const { id, postId } = req.params; // 'id' es el del Tag, 'postId' es el del Post

    // 1. Buscamos ambos en la base de datos usando sus IDs
    const post = await Post.findByPk(Number(postId));
    const tag = await Tag.findByPk(Number(id));

    // 2. Si alguno no existe, cortamos la ejecución acá con un 404 personalizado
    if (!post) {
      return res.status(404).json({ message: `El Post con ID ${postId} no existe` });
    }
    if (!tag) {
      return res.status(404).json({ message: `El Tag con ID ${id} no existe` });
    }

    // 3. Si ambos existen, los inyectamos en el 'req' para que el controlador los use gratis
    req.post = post;
    req.tag = tag;

    // 4. Luz verde para pasar al controlador
    next();
  } catch (error) {
    console.error("Error en middleware validarPostYTag:", error);
    return res.status(500).json({ message: "Error interno al validar los IDs de Post y Tag" });
  }
};


module.exports = {
  validarExiteTagConPosts,
  validarNombreTag,
  validarPostYTag
};
