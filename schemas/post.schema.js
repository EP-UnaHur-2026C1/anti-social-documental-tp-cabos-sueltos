const Joi = require("joi");

const postSchema = Joi.object({
  texto: Joi.string().min(1).required().messages({
    "string.empty": "El post no puede estar vacio",
    "any.required": "El post no puede estar vacio",
  }),
  userId: Joi.number().integer().positive().required().messages({
    "number.positive": "El userId debe ser mayor a 0",
    "any.required": "El userId es obligatorio",
  }),
  imagenes: Joi.array().items(Joi.string().uri()).optional().messages({
    "string.uri": "Cada imagen debe ser una URL válida",
  }),
  etiquetas: Joi.array().items(Joi.number().integer().positive()).optional(),
});

module.exports = postSchema;
