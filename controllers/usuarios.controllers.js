const User = require("../models/User.js");

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find(); // la password tiene select en false, asi que no lo va a traer
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

const obtenerUsuario = async (req, res) => {
  try {
    const usuario = req.usuario; // Obtenemos el usuario validado por el middleware
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

const crearUsuario = async (req, res) => {
  try {
    const { nickname, email, password } = req.body;
    const usuario = await User.create({ nickname, email, password });
    res.status(201).json({ message: "Usuario creado correctamente", usuario });
  } catch (error) {
    console.error("ERROR COMPLETO:", error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { nickname, email, password } = req.body;
    const usuario = req.usuario; // Obtenemos el usuario validado por el middleware

    if (nickname) usuario.nickname = nickname;
    if (email) usuario.email = email;
    if (password) usuario.password = password;

    await usuario.save();

    res.status(200).json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const usuario = req.usuario; // Obtenemos el usuario validado por el middleware
    await usuario.deleteOne(); // no hace falta pasarle argumento porque ya lo tiene usuario
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error("ERROR COMPLETO DE ELIMINAR USUARIO:", error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
