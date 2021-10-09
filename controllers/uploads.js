const path= require('path');
const fs = require('fs')
const { response, json } = require("express");

const cluoudnary = require('cloudinary').v2

cluoudnary.config(  process.env.CLOUDINARY_URL);

const { subirArchivo } = require("../helpers/subir-archivo");

const { Usuario, Producto } = require("../models");
const Tipo_habitacion = require('../models/habitacion/tipo_habitacion');
const Servicio = require('../models/servicio');




const actualizarImagenCloudinary = async (req, res = response) => {
  const { id, coleccion } = req.params;
  const {uri}= req.body;
  let modelo;

  switch (coleccion) {
    case "usuario":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;

    case "tipo_habitacion":
      modelo = await Tipo_habitacion.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;

      case "servicio":
        modelo = await Servicio.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg: `No existe un producto con el id ${id}`,
          });
        }
        break;

    default:
      return res.status(500).json({ msg: "Olvide validar esto" });
  }

  //Limpiar imagenes previas

    try {
      if(modelo.img){
          const nombreArr=modelo.img.split('/');
          const nombre= nombreArr[nombreArr.length-1];
          const [public_id]=nombre.split('.')
          cluoudnary.uploader.destroy(public_id);

     }

     if(!uri){
      const {tempFilePath}= req.files.archivo
      const  {secure_url}= await cluoudnary.uploader.upload(tempFilePath)
      modelo.img = secure_url;
     }else{
      
      const  {secure_url}= await cluoudnary.uploader.upload(uri)
      modelo.img = secure_url;
     }
    

     await modelo.save();
     res.json(modelo);
       

    } catch (msg) {
      res.status(500).json(msg)
    }


};


const menu_subir_archivo = async (req, res = response) => {
  res.sendFile(path.resolve(__dirname, "../public/subir_archivo.html"));
};

module.exports = {
  actualizarImagenCloudinary,
  menu_subir_archivo
};
