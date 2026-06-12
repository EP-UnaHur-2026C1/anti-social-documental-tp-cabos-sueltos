const express = require("express");
const router = express.Router();
const {
  crearComentario,
  eliminarComentario,
  obtenerComentario,
  actualizarComentario,
} = require("../controllers/comentarios.controllers.js");

//const validarComentario = require("../middlewares/validarComentario.js");
//const validarUsuarioId = require("../middlewares/validarUsuarioId.js");
//const validarPostId = require("../middlewares/validarPostId.js");
//const validarComentarioId = require("../middlewares/validarComentarioId.js");

router.get("/:id"/*, validarComentarioId*/, obtenerComentario);
router.post(
  "/"/*,
  validarComentario,
  validarUsuarioId,
  validarPostId*/,
  crearComentario,
);
router.put("/:id"/*, validarComentarioId*/, actualizarComentario);
router.delete("/:id"/*, validarComentarioId*/, eliminarComentario);

module.exports = router;
