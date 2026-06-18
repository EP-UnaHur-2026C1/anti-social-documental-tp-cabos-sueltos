const { Router } = require("express");
const {
  obtenerPostImage,
  crearPostImage,
  eliminarImagen,
} = require("../controllers/postImages.controllers.js");
const validarPostImage = require("../middlewares/validarImage.js");
const {
  validarImageId,
  validarUrl,
} = require("../middlewares/validarImageId.js");
const validarPostId = require("../middlewares/validarPostId.js");
const router = Router();

router.get(
  "/:postId",
  /*validarPostImage,*/
  validarPostId,
  obtenerPostImage,
);// no funciona
router.post("/:postId/imagenes", validarPostId, validarUrl, crearPostImage); //funciona
router.delete(
  "/:id",
  validarImageId,
  eliminarImagen
);// no funciona,

module.exports = router;
