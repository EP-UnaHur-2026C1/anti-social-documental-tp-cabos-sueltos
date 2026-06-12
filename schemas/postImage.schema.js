const Joi = require("joi");

const postImageSchema = Joi.object({
  imageUrl: Joi.string().uri().required().messages({
    "string.empty": "La URL de la imagen es obligatoria",
    "string.uri": "Debe proporcionar una URL válida ",
    "any.required": "La URL de la imagen es obligatoria",
  }),
});

module.exports = postImageSchema;