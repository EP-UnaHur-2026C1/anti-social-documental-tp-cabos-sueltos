const { Post } = require("../models");
const { Post_Images } = require("../models/post_images.js");

const obtenerImagenes = async (req, res) =>{
  try{
    const imagenes = await Post_Images.find(); 
    res.status(200).json(imagenes);
  }catch(error){
     res.status(500).json({ message: "Error al obtener las imágenes" });
  }
}



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
    const url = req.imageUrl; 
    const post = req.post;     

    const nuevaImagenEntidad = new Post_Images({
      postId: post._id,
      imageUrl: url
    });
    await nuevaImagenEntidad.save(); 

    
    post.imagenes.push({ url }); 
    await post.save();

    // Devolvemos la imagen de la entidad recién creada para confirmar
    res.status(201).json(nuevaImagenEntidad);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar la imagen en la entidad" });
  }
};


const eliminarImagen = async (req, res) => {
  try {
    const { id } = req.params; 

    
    const imagenEntidad = await Post_Images.findByIdAndDelete(id);
    if (!imagenEntidad) {
      return res.status(404).json({ message: "La imagen no existe en la entidad Post_Images" });
    }
    await Post.findByIdAndUpdate(
      imagenEntidad.postId,
      { $pull: { imagenes: { url: imagenEntidad.imageUrl } } } 
    );

    return res.status(200).json({ message: "Imagen eliminada con éxito de la entidad y del post" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno al eliminar la imagen" });
  }
};

module.exports = {
  obtenerPostImage,
  crearPostImage,
  eliminarImagen,
  obtenerImagenes
};