const { Post, User, Post_Images, Tag, Comment } = require("../models/index");
const { Op } = require("sequelize");

const validarExistePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    // 1. Calculamos la fecha límite usando las variables de entorno
    const mesesLimite = parseInt(process.env.COMMENT_MAX_AGE_MONTHS, 10) || 6;
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - mesesLimite);

    // 2. Hacemos la consulta gigante con todos los includes configurados
    const post = await Post.findByPk(id, {
      include: [
        { 
          model: User, 
          as: "usuario", 
          attributes: { exclude: ["password"] } 
        },
        { 
          model: Post_Images, 
          as: "imagenes" 
        },
        { 
          model: Tag, 
          as: "etiquetas", 
          through: { attributes: [] } 
        },
        { 
          model: Comment, 
          as: "comentarios",
          where: {
            fecha: {
              [Op.gte]: fechaLimite
            }
          },
          required: false, // Evita que oculte el post si no tiene comentarios
          include: [{ model: User, as: "usuario", attributes: ["id", "nickname"] }]
        }
      ]
    });

    // 3. Si no existe, cortamos el flujo con un 404
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    // 4. Si existe, lo guardamos en el objeto 'req'
    req.post = post;
    
    next();
  } catch (error) {
    console.error("Error en middleware validarExistePost:", error);
    return res.status(500).json({ message: "Error interno al buscar el post" });
  }
};

module.exports = validarExistePost;