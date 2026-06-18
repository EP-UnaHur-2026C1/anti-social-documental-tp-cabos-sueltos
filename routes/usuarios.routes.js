const { Router } = require("express");
const {
  obtenerUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/usuarios.controllers.js");

const {
  validarUsuario,
  validarActualizarUsuario,
} = require("../middlewares/validarUsuario.js");

const validarUsuarioId = require("../middlewares/validarUsuarioId.js");

const router = Router();

router.get("/", obtenerUsuarios);//funciona
router.get("/:id", validarUsuarioId, obtenerUsuario);//funciona
router.post("/", validarUsuario, crearUsuario);//funciona
router.put(
  "/:id",
  validarUsuarioId,
  validarActualizarUsuario,
  actualizarUsuario
);//funciona
router.delete("/:id", validarUsuarioId, eliminarUsuario);//funciona

module.exports = router;
