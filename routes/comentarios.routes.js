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

router.get("/:id", validarComentarioId, obtenerComentario); //funciona
router.post("/", validarComentario, crearComentario); // funciona
router.put(
  "/:id",
  validarComentarioId,
  validarActualizarComentario,
  actualizarComentario,
); // funciona
router.delete("/:id", validarComentarioId, eliminarComentario); //funciona

module.exports = router;
