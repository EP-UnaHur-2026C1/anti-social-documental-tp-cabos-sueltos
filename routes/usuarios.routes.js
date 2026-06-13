const { Router } = require("express");
const {
  obtenerUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/usuarios.controllers.js");

//Importo middleware de validación
const {
  validarUsuario,
  validarActualizarUsuario,
} = require("../middlewares/validarUsuario.js");

const validarUsuarioId = require("../middlewares/validarUsuarioId.js");

const router = Router();

router.get("/", obtenerUsuarios);
router.get("/:id", validarUsuarioId, obtenerUsuario);
router.post("/", validarUsuario, crearUsuario);
router.put(
  "/:id",
  validarUsuarioId,
  validarActualizarUsuario,
  actualizarUsuario,
);
router.delete("/:id", validarUsuarioId, eliminarUsuario);

module.exports = router;
