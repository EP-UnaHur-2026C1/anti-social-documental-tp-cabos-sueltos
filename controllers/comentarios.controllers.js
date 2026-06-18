const { Comment, User, Post } = require("../models");

const obtenerComentario = async (req, res) => {
  try {
    const comentario = await Comment.findById(req.comentario._id)
      .populate("autor", "-password")
      .populate("post");

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
    const { contenido, autor, post } = req.body;
    //  Creamos el comentario directamente
    const comentario = await Comment.create({
      contenido,
      autor,
      post: post,
    });

    // Se sincroniza el comentario con el array de comentarios del post
    await Post.findByIdAndUpdate(post, {
      $push: { comentarios: comentario._id },
    });

    return res
      .status(201)
      .json({ message: "Comentario creado correctamente", comentario });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear el comentario" });
  }
};

const actualizarComentario = async (req, res) => {
  try {
    const { contenido } = req.body;
    const comentario = req.comentario; // El comentario ya viene validado y adjuntado por el middleware validarComentarioId

    comentario.contenido = contenido;
    await comentario.save();

    res
      .status(200)
      .json({ message: "Comentario actualizado correctamente", comentario });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el comentario" });
  }
};

// Eliminar un comentario
const eliminarComentario = async (req, res) => {
  try {
    const comentario = req.comentario;

    //Primero se saca el comentario del array de comentarios del post
    await Post.findByIdAndUpdate(comentario.post, {
      $pull: { comentarios: comentario._id },
    });

    //Despues se elimina el comentario en si
    await comentario.deleteOne();
    res.status(200).json({ message: "Comentario eliminado correctamente" });
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
