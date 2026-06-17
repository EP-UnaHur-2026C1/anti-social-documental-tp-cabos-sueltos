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

} = require("../middlewares/validarTagId.js");

router.get("/", obtenerTags);
router.post("/", validarNombreTag, crearTag);
router.get("/:id/posts", validarExiteTagConPosts, obtenerPostsPorTag);
router.post("/posts/:postId/tags/:id",validarExiteTagConPosts, asignarTagAPost);

module.exports = router;
