const schemaComentario = require("../schemas/comentario.schema.js");

const validarComentario = (req, res, next) => {
  const { error } = schemaComentario.validate(req.body);
  console.log("Error de validación:", error);
  
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  return next();
};

module.exports = validarComentario;