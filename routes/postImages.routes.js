const { Router } = require("express");
const {
  obtenerPostImage,
  crearPostImage,
  eliminarPostImage,
} = require("../controllers/postImages.controllers.js");
const validarPostImage = require("../middlewares/validarImage.js");
const {validarImageId,validarUrl} = require("../middlewares/validarImageId.js");
const validarPostId = require("../middlewares/validarPostId.js");
const router = Router();

router.get(
  "/:postId/imagenes",
  validarPostImage,
  validarPostId,
  obtenerPostImage,
);
router.post("/:postId/imagenes", validarPostId,validarUrl, crearPostImage);
router.delete("/:postId/imagenes/:id", validarPostId, validarImageId, eliminarPostImage);

module.exports = router;
