const Joi = require("joi");

const usuarioSchema = Joi.object({
  nickname: Joi.string().min(3).max(50).required().messages({
    "string.min": "El nickname debe tener al menos 3 caracteres",
    "string.max": "El nickname no puede superar los 50 caracteres",
    "any.required": "El nickname  es obligatorio",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "El email no tiene un formato válido",
    "any.required": "El email es obligatorio",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "La contraseña debe tener al menos 6 caracteres",
    "any.required": "La contraseña es obligatoria",
  }),
  
});

module.exports = usuarioSchema;
