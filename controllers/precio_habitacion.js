const { response, request } = require("express");
const Precio_habitacion = require("../models/habitacion/precio_habitacion");


const postPrecioHabitacion= async(req,res=response)=>{
    const{precio,tipo_habitacion}= req.body;
    const precioHabitacion= new Precio_habitacion({precio,tipo_habitacion});

  

    //guardar en DB
    await precioHabitacion.save();

    res.json({
        msg : precioHabitacion
    })
}

const precioHabitacionGet= async(req,res=response)=>{
    const {limite=5,desde=0}=req.query;
    

    const[total,habitacion]=await Promise.all([
        Precio_habitacion.countDocuments(),
        Precio_habitacion.find()
        .populate('tipo_habitacion','categoria')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    
    res.json({
        total,
        habitacion
    })
}


module.exports={
    postPrecioHabitacion,
    precioHabitacionGet
}