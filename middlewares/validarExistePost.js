const Post = require("../models/Post.js");
const Comment = require("../models/Comment.js");

const validarExistePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const mesesLimite = parseInt(process.env.COMMENT_MAX_AGE_MONTHS) || 6;
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - mesesLimite);

    // Se actualiza la visibilidad de comentarios viejos de este post
    await Comment.updateMany(
      { post: id, createdAt: { $lt: fechaLimite }, visible: true },
      { $set: { visible: false } },
    );

    const post = await Post.findById(id)
      .populate("autor", "-password")
      .populate("tags", "nombre")
      .populate({
        path: "comentarios",
        match: { visible: true },
        populate: { path: "autor", select: "nickname" },
      });

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    req.post = post;
    next();
  } catch (error) {
    console.error("Error en middleware validarExistePost:", error);
    return res.status(500).json({ message: "Error interno al buscar el post" });
  }
};

module.exports = validarExistePost;
