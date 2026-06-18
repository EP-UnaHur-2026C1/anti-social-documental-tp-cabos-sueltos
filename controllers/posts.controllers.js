const { Post, User, Comment, Tag } = require("../models/index.js");


const obtenerPosts = async (req, res) => {
  try {
    // Leemos la variable de entorno para ocultar automáticamente los comentarios viejos, si no existe por defecto usamos 6 meses
    const mesesLimite = parseInt(process.env.COMMENT_MAX_AGE_MONTHS) || 6;
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - mesesLimite);

    // Se actualiza el campo "visible" de todos los comentarios que superen el COMMENT_MAX_AGE_MONTHS antes de traer los posts
    await Comment.updateMany(
      { createdAt: { $lt: fechaLimite }, visible: true },
      { $set: { visible: false } },
    );

    //Se obtienen los posts con los comentarios que figuren como visibles unicamente
    const posts = await Post.find()
      .populate("autor", "-password")
      .populate("tags", "nombre")
      .populate({
        path: "comentarios",
        match: { visible: true },
        populate: { path: "autor", select: "nickname" },
      })
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener los posts" });
  }
};

const obtenerPost = async (req, res) => {
  try {
    return res.status(200).json(req.post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener el post" });
  }
};

const crearPost = async (req, res) => {
  try {
    const { texto, autor, imagenes, tags } = req.body;

    // Creamos el post, en el caso de imagenes y tags los agrega solo si los tiene, sino deja un array vacio
    const post = await Post.create({
      texto,
      autor,
      imagenes: imagenes ? imagenes.map((url) => ({ url })) : [],
      tags: tags || [],
    });

    res.status(201).json({ message: "Post creado correctamente", post });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al crear el post", error: error.message });
  }
};

const actualizarPost = async (req, res) => {
  try {
    const { texto } = req.body;
    const post = req.post; // Obtenemos el post validado por el middleware
    post.texto = req.body.texto;
    await post.save();
    res.status(200).json({ message: "Post actualizado correctamente", post });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el post" });
  }
};

const eliminarPost = async (req, res) => {
  try {
    const post = req.post;
    await post.deleteOne();
    res.status(200).json({ message: "Post eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el post" });
  }
};

const agregarImagen = async (req, res) => {
  try {
    const { url } = req.body;
    const post = req.post;
    
   
    post.imagenes.push({ url });
    await post.save();

    res.status(200).json({ message: "Imagen agregada correctamente", post });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar la imagen" });
  }
};

const eliminarImagenDePost = async (req, res) => {
  try {
    const  imageId  = req.imagen;
    const post = req.post;

    post.imagenes.id(imageId).deleteOne();
    await post.save();

    res.status(200).json({ message: "Imagen eliminada correctamente", post });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la imagen" });
  }
};
 

module.exports = {
  obtenerPosts,
  obtenerPost,
  crearPost,
  actualizarPost,
  eliminarPost,
  agregarImagen,
  eliminarImagenDePost,
};
