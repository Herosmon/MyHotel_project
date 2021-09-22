const { response, request } = require("express");
const { notificacionSis } = require("../helpers/notification");
const Rol = require("../models/rol");


const postRol= async(req,res=response)=>{
    try {
        const{rol}= req.body;
        const role= new Rol({rol});
        await role.save();
        res.json({
            msg : 'ok',
            rol
        })   
    } catch (error) {
        res.status(500).json(notificacionSis(error));
    }
}


module.exports={
    postRol
}