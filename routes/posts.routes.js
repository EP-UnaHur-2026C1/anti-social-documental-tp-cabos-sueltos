const { Router } = require("express");
const {
  obtenerPosts,
  obtenerPost,
  crearPost,
  actualizarPost,
  eliminarPost,
  agregarImagen,
  eliminarImagen,
} = require("../controllers/posts.controllers.js");

const {
  validarActualizarPost,
  validarPost,
} = require("../middlewares/validarPost.js");
const validarExistePost = require("../middlewares/validarExistePost.js");
const validarPostId = require("../middlewares/validarPostId.js");
const validarPostImage = require("../middlewares/validarImage.js");
const {validarImageId} = require("../middlewares/validarImageId.js");

const router = Router();

router.get("/", obtenerPosts);
router.get("/:id", validarExistePost, obtenerPost);
router.post("/", validarPost, crearPost);
router.put("/:id", validarPostId, validarActualizarPost, actualizarPost);
router.delete("/:id", validarPostId, eliminarPost);

//Post Images
router.post("/:id/imagenes", validarPostId, validarPostImage, agregarImagen);
router.delete(
  "/:id/imagenes/:imageId",
  validarPostId,
  validarImageId,
  eliminarImagen,
);

module.exports = router;
