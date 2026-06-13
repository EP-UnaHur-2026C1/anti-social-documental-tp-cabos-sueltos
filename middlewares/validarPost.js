const {
  postSchema,
  actualizarPostSchema,
} = require("../schemas/post.schema.js");

const validarPost = (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

const validarActualizarPost = (req, res, next) => {
  const { error } = actualizarPostSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

module.exports = { validarPost, validarActualizarPost };
