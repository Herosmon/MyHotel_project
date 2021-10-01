const { response, request } = require("express");
const { notificacionSis } = require("../helpers/notification");
const { firstUpper } = require("../helpers/FirstToUppercase");
const Tipo_habitacion = require("../models/habitacion/tipo_habitacion");

const postTipoHabitacion = async (req, res = response) => {
  try {
    const { categoria, camas, terraza, precio,img = "" } = req.body;
    const tipoHabitacion = new Tipo_habitacion({
      categoria: firstUpper(categoria),
      camas,
      terraza,
      img,
      precio
    });
    //guardar en DB
    const result =await tipoHabitacion.save();
    res.json({
      msg: "ok",
      res: result.id,
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

const getTipoHabitacionEspecifico = async (req, res = response) => {
  try {
    const { id } = req.params;

    const habitacion  = await Tipo_habitacion.findById(id);
    
    res.json({
      msg: "Ok",
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

const deleteTipoHabitacion = async (req, res = response) => {
  try {
    const { id } = req.params;

    const {estado} =  await Tipo_habitacion.findById(id);
    const tipo = await Tipo_habitacion.findByIdAndUpdate(id, { estado: !estado });

    if(!estado===true)
    {
      res.json({
        msg: "Ok",
        description: "Tipo de habitacion habilitado correctamente",
      });

    }else{
      res.json({
        msg: "Ok",
        description: "Tipo de habitacion deshabilitado correctamente",
      });
    }
    
  } catch (error) {
    res.status(500).json(notificacionSis(error));
  }
};

module.exports = {
  postTipoHabitacion,
  getTipoHabitacion,
  putTipoHabitacion,
  deleteTipoHabitacion,
  getTipoHabitacionEspecifico
};
