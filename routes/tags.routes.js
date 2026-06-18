const express = require("express");
const router = express.Router();
const {
  obtenerTags,
  crearTag,
  obtenerPostsPorTag,
  asignarTagAPost,
} = require("../controllers/tags.controllers");
const validarTag = require("../middlewares/validarTag.js");
const {
  validarExiteTagConPosts,
  validarNombreTag,
  validarExisteTag
} = require("../middlewares/validarTagId.js");


router.get("/", obtenerTags);//funciona
router.post("/", validarTag,validarNombreTag, crearTag);//funciona
router.get("/:id/posts", validarExisteTag, obtenerPostsPorTag);//funciona
router.post(
  "/:id/posts/:postId",
  validarExiteTagConPosts,
  asignarTagAPost
);//funciona

module.exports = router;
