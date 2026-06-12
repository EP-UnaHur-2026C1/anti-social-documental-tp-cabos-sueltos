const { Router } = require("express");
const {
  obtenerPosts,
  obtenerPost,
  crearPost,
  actualizarPost,
  eliminarPost,
} = require("../controllers/posts.controllers.js");

//const validarPost = require("../middlewares/validarPost.js");
//const validarExistePost = require("../middlewares/validarExistePost.js");
//const validarPostId = require("../middlewares/validarPostId.js");
//const validarUsuarioId = require("../middlewares/validarUsuarioId.js");

const router = Router();

router.get("/", obtenerPosts);
router.get("/:id"/*, validarExistePost*/, obtenerPost);
router.post("/"/*, validarPost, validarUsuarioId*/, crearPost);
router.put("/:id"/*, validarPost,validarPostId*/, actualizarPost);
router.delete("/:id"/*,validarPostId*/, eliminarPost);

module.exports = router;
