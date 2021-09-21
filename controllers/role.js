const { response, request } = require("express");
const Rol = require("../models/rol");


const postRol= async(req,res=response)=>{
    const{rol}= req.body;
    const role= new Rol({rol});

  

    //guardar en DB
    await role.save();

    res.json({
        msg : rol
    })
}


module.exports={
    postRol
}