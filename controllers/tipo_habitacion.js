const { response, request } = require("express");
const Tipo_habitacion = require("../models/habitacion/tipo_habitacion");


const postTipoHabitacion= async(req,res=response)=>{
    const{categoria,camas, terraza,img=''}= req.body;
    const tipoHabitacion= new Tipo_habitacion({categoria,camas, terraza,img});

  

    //guardar en DB
    await tipoHabitacion.save();

    res.json({
        msg : tipoHabitacion
    })
}

const GetTipoHabitacion= async(req,res=response)=>{
    const {limite=5,desde=0}=req.query;
    

    const[total,habitacion]=await Promise.all([
        Tipo_habitacion.countDocuments(),
        Tipo_habitacion.find()
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    
    res.json({
        total,
        habitacion
    })
}



module.exports={
    postTipoHabitacion,
    GetTipoHabitacion
}