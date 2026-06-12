const { Comentario } = require("../models/index.js");


const validarComentarioId = async (req, res, next) => {

    const { id } = req.params;
    try {
        const comentario = await Comment.findByPk(id);

        if (!comentario) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }
        req.comentario = comentario;
        next();
    } catch (error) {
        res.status(500).json({ message: "Error al validar el comentario" });
    }
};

module.exports = validarComentarioId;