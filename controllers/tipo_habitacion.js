const { response, request } = require("express");
const { notificacionSis } = require("../helpers/notification");
const Tipo_habitacion = require("../models/habitacion/tipo_habitacion");

const postTipoHabitacion = async (req, res = response) => {
  try {
    const { categoria, camas, terraza, img = "" } = req.body;
    const tipoHabitacion = new Tipo_habitacion({
      categoria,
      camas,
      terraza,
      img,
    });
    //guardar en DB
    await tipoHabitacion.save();
    res.json({
      msg: "ok",
      tipoHabitacion,
    });
  } catch (error) {
    res.status(500).json(notificacionSis(error));
  }
};

const getTipoHabitacion = async (req, res = response) => {
  try {
    const { limite = 5, desde = 0 } = req.query;

    const [total, habitacion] = await Promise.all([
      Tipo_habitacion.countDocuments(),
      Tipo_habitacion.find().skip(Number(desde)).limit(Number(limite)),
    ]);

    res.json({
      msg: "Ok",
      total,
      habitacion,
    });
  } catch (error) {
    res.status(500).json(notificacionSis(error));
  }
};

const putTipoHabitacion = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { _id, ...resto } = req.body;
    const tipoDB = await Tipo_habitacion.findByIdAndUpdate(id, resto);

    res.json({
      msg: "Ok",
      description: "Datos actulizados correctamente -tipoHabitacion",
    });
  } catch (error) {
    res.status(500).json(notificacionSis(error));
  }


};

module.exports = {
  postTipoHabitacion,
  getTipoHabitacion,
  putTipoHabitacion,
};
