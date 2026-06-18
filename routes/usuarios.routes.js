const { Router } = require("express");
const {
  obtenerUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  seguirUsuario,
  dejarDeSeguir,
} = require("../controllers/usuarios.controllers.js");

const {
  validarUsuario,
  validarActualizarUsuario,
} = require("../middlewares/validarUsuario.js");

const validarUsuarioId = require("../middlewares/validarUsuarioId.js");
const validarSeguidorId = require("../middlewares/validarSeguidorId.js");
const validarSeguimientos = require("../middlewares/validarSeguimientos.js");

const router = Router();

router.get("/", obtenerUsuarios); //funciona
router.get("/:id", validarUsuarioId, obtenerUsuario); //funciona
router.post("/", validarUsuario, crearUsuario); //funciona
router.put(
  "/:id",
  validarUsuarioId,
  validarActualizarUsuario,
  actualizarUsuario,
); //funciona
router.delete("/:id", validarUsuarioId, eliminarUsuario); //funciona

//Seguir y dejar de seguir usuarios
router.post(
  "/:id/follow",
  validarUsuarioId,
  validarSeguidorId,
  validarSeguimientos("seguir"),
  seguirUsuario,
);
router.post(
  "/:id/unfollow",
  validarUsuarioId,
  validarSeguidorId,
  validarSeguimientos("dejarDeSeguir"),
  dejarDeSeguir,
);

module.exports = router;
