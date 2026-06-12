const Joi = require("joi");

const comentarioSchema = Joi.object({
  contenido: Joi.string().trim().min(1).required().messages({
    "string.empty": "El comentario no puede estar vacio",
    "string.min": "El comentario no puede estar vacio",
    "any.required": "El comentario no puede estar vacio",
  }),
  userId: Joi.number().integer().positive().required().messages({
    "number.positive": "El userId debe ser mayor a 0",
    "any.required": "El userId es obligatorio",
  }),
  postId: Joi.number().integer().positive().required().messages({
    "number.positive": "El postId debe ser mayor a 0",
    "any.required": "El postId es obligatorio",
  }),
});

module.exports = comentarioSchema;
