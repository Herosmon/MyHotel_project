const { response, request } = require("express");

const { notificacionSis } = require("../helpers/notification");
const Habitacion = require("../models/habitacion/habitacion");



const getHabitacionLibre = async (req, res = response) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { ocupado: false };
       
        const [total, habitacion] = await Promise.all([
          Habitacion.countDocuments(query),
          Habitacion.find(query).skip(Number(desde)).limit(Number(limite)),
        ]);
    
        res.json({
          msg: "Ok",
          total,
          habitacion,
        });
      } catch (error) {
        res.status(500).json(notificacionSis(error));
      }
}



const postHabitacion = async (req, res = response) => {
    try {
      const { numero, tipo_habitacion} = req.body;
      const habitacion = new Habitacion({
        numero, 
        tipo_habitacion
      });
      //guardar en DB
      await habitacion.save();
      res.json({
        msg: "ok",
        habitacion,
      });
    } catch (error) {
      res.status(500).json(notificacionSis(error));
    }
  };

  const putHabitacion = async (req, res = response) => {
    try {
      const { id } = req.params;
      const { _id, ...resto } = req.body;
      await Habitacion.findByIdAndUpdate(id, resto);
  
      res.json({
        msg: "Ok",
        description: "Datos actulizados correctamente -Habitacion",
      });
    } catch (error) {
      res.status(500).json(notificacionSis(error));
    }
  };







  module.exports={
    getHabitacionLibre,
    postHabitacion,
    putHabitacion
  }