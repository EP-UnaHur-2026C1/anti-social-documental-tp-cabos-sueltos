const schemaUsu = require("../schemas/usuario.schema.js");

const validarUsuario = (req, res, next) => {
  
  const { error } = schemaUsu.validate(req.body);
  console.log("Error de validación:", error);
  
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  return next();
};

module.exports = validarUsuario