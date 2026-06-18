/*

YA NO ES NECESARIA ESTA RUTA, LAS IMAGENES SE MANEJAN DESDE POSTS

const { Router } = require("express");
const {
  obtenerPostImage,
  crearPostImage,
  eliminarImagen,
  obtenerImagenes
} = require("../controllers/postImages.controllers.js");
const validarPostImage = require("../middlewares/validarImage.js");
const {
  validarImageId,
  validarUrl,
} = require("../middlewares/validarImageId.js");
const validarPostId = require("../middlewares/validarPostId.js");
const router = Router();

router.get("/",obtenerImagenes)//funciona
router.get(
  "/:postId",
  validarPostImage,
  validarPostId,
  obtenerPostImage,
);// no funciona
router.post("/:postId/imagenes", validarPostId, validarUrl, crearPostImage); //funciona
router.delete(
  "/:id",
  validarImageId,
  eliminarImagen
);// funciona,

module.exports = router;

YA NO ES NECESARIA ESTA RUTA, LAS IMAGENES SE MANEJAN DESDE POSTS
*/
