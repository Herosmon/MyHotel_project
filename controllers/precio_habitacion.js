const { response, request } = require("express");
const { notificacionSis } = require("../helpers/notification");
const Precio_habitacion = require("../models/habitacion/precio_habitacion");

const postPrecioHabitacion = async (req, res = response) => {
  try {
    const { precio, tipo_habitacion } = req.body;
    const precioHabitacion = new Precio_habitacion({ precio, tipo_habitacion });
    //guardar en DB
    await precioHabitacion.save();
    res.json({
      msg: "ok",
      precioHabitacion,
    });
  } catch (error) {
    res.status(500).json(notificacionSis(error));
  }
};

const getprecioHabitacion = async (req, res = response) => {
  try {
    const { limite = 5, desde = 0 } = req.query;
    const [total, habitacion] = await Promise.all([
      Precio_habitacion.countDocuments(),
      Precio_habitacion.find()
        .populate("tipo_habitacion", "categoria")
        .skip(Number(desde))
        .limit(Number(limite)),
    ]);

    res.json({
      msg: "ok",
      total,
      habitacion,
    });
  } catch (error) {
    res.status(500).json(notificacionSis(error));
  }
};

const putPrecio = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { tipo_habitacion, ...resto } = req.body;
    const precioDB = await Precio_habitacion.findByIdAndUpdate(id, resto);
    res.json({
      description: "Datos actulizados correctamente",
    });
  } catch (error) {
    res.status(500).json(notificacionSis(error));
  }
};

module.exports = {
  postPrecioHabitacion,
  getprecioHabitacion,
  putPrecio,
};
