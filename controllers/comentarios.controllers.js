const { Comment, User, Post } = require("../models");

const obtenerComentario = async (req, res) => {
  try {
    //Tomamos el comentario que el middleware ya buscó y guardó en el req
    const comentario = req.comentario;

    // Usamos .reload() con await para traer dinámicamente al Usuario y al Post
    await comentario.reload({
      include: [
        {
          model: User,
          as: "usuario",
          attributes: { exclude: ["password"] },
        },
        {
          model: Post,
          as: "post",
        },
      ],
    });
    // Ahora que está inflado con la data completa, respondemos
    return res.status(200).json(comentario);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al obtener el comentario completo" });
  }
};

const crearComentario = async (req, res) => {
  try {
    const { contenido, userId, postId } = req.body;
    //  Creamos el comentario directamente
    const nuevoComentario = await Comment.create({ contenido, userId, postId });

    //  Respondemos con el éxito de la creación
    return res.status(201).json(nuevoComentario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear el comentario" });
  }
};

const actualizarComentario = async (req, res) => {
  try {
    const { contenido } = req.body;
    const comentario = req.comentario; // El comentario ya viene validado y adjuntado por el middleware validarComentarioId

    await comentario.update({ contenido });
    res.status(200).json(comentario);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el comentario" });
  }
};

// Eliminar un comentario
const eliminarComentario = async (req, res) => {
  try {
    const comentario = req.comentario; // El comentario ya viene validado y adjuntado por el middleware validarComentarioId
    await comentario.destroy();
    res.status(200).json({ message: "Comentario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el comentario" });
  }
};

module.exports = {
  obtenerComentario,
  crearComentario,
  actualizarComentario,
  eliminarComentario,
};
