const {
  comentarioSchema,
  actualizarComentarioSchema,
} = require("../schemas/comentario.schema.js");

const validarComentario = (req, res, next) => {
  const { error } = comentarioSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

const validarActualizarComentario = (req, res, next) => {
  const { error } = actualizarComentarioSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

module.exports = { validarComentario, validarActualizarComentario };
