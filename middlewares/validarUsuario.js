const {
  usuarioSchema,
  actualizarUsuarioSchema,
} = require("../schemas/usuario.schema.js");

const validarUsuario = (req, res, next) => {
  const { error } = usuarioSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  return next();
};

//Para poder actualizar campos del usuario por separado
const validarActualizarUsuario = (req, res, next) => {
  const { error } = actualizarUsuarioSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

module.exports = { validarUsuario, validarActualizarUsuario };
