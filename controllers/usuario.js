const { response, request, json } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { notificacionSis } = require("../helpers/notification");

const usuarioGet = async (req, res = response) => {
  try {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);

    res.json({
      msg: "Ok",
      total,
      usuarios,
    });
  } catch (error) {
    res.status(500).json(notificacionSis(error));
  }
};

const usuarioPost = async (req = request, res = response) => {
  try {
    const { identificacion, nombre, apellido, correo, clave, telefono, rol } =
      req.body;
    if (rol == "ADMIN" || rol == "AUX") {
      res.status(401).json({
        msg: "error",
        description: "No tiene permiso para crear usuario",
      });
    } else {
      const usuario = new Usuario({
        identificacion,
        nombre,
        apellido,
        correo,
        clave,
        telefono,
        rol,
      });

      //Encriptacion de clave
      const salt = bcryptjs.genSaltSync(10);
      usuario.clave = bcryptjs.hashSync(clave, salt);

      //guardar en DB
      await usuario.save();

      res.json({
        msg: "Ok",
        usuario,
      });
    }
  } catch (error) {
    res.status(500).json(notificacionSis(error));
  }
};

const usuarioPut = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { _id, clave, google, correo, ...resto } = req.body;

    if (clave) {
      const salt = bcryptjs.genSaltSync(10);
      resto.clave = bcryptjs.hashSync(clave, salt);
    }
    const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
      msg: "Ok",
      description: "Datos actulizados correctamente",
    });
  } catch (error) {
    res.status(500).json(notificacionSis(error));
  }
};

const usuarioDelete = async (req, res = response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    res.json({
      msg: "Ok",
      description: "Usuario deshabilitado correctamente",
    });
  } catch (error) {
    res.status(500).json(notificacionSis(error));
  }
};

module.exports = {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
};
