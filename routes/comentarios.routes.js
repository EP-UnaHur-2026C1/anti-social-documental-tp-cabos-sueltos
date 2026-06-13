const express = require("express");
const router = express.Router();
const {
  crearComentario,
  eliminarComentario,
  obtenerComentario,
  actualizarComentario,
} = require("../controllers/comentarios.controllers.js");

const {
  validarComentario,
  validarActualizarComentario,
} = require("../middlewares/validarComentario.js");
const validarComentarioId = require("../middlewares/validarComentarioId.js");

router.get("/:id", validarComentarioId, obtenerComentario);
router.post("/", validarComentario, crearComentario);
router.put(
  "/:id",
  validarComentarioId,
  validarActualizarComentario,
  actualizarComentario,
);
router.delete("/:id", validarComentarioId, eliminarComentario);

module.exports = router;
