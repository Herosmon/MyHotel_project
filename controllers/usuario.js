const { response, request, json } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const {validarCampos,validarJWT,esAdminRole,tieneRole}= require( '../middlewares' );

const usuarioGet= async(req,res=response)=>{
    const {limite=5,desde=0}=req.query;
    const query={estado: true};

    const[total,usuarios]=await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    })
}


const usuarioPost= async(req=request,res=response)=>{
    const{identificacion,nombre,apellido,correo,clave,telefono,rol}= req.body;
    if(rol=="ADMIN" || rol=="AUX" )
    {
        res.status(401).json({
            msg:"No tiene permiso para crear usuario"
        })
    }else{

  
    const usuario= new Usuario({identificacion,nombre,apellido,correo,clave,telefono,rol});

    //Encriptacion de clave
    const salt=bcryptjs.genSaltSync(10);
    usuario.clave = bcryptjs.hashSync(clave, salt);

    //guardar en DB
    await usuario.save();

    res.json({
         usuario
    })
}
}

const usuarioPut= async(req,res=response)=>{
    const {id}=req.params;
    const{_id,clave,google,correo, ...resto}=req.body;

    if(clave){
        const salt = bcryptjs.genSaltSync(10);
        resto.clave = bcryptjs.hashSync(clave, salt);
    }
    const usuarioDB= await Usuario.findByIdAndUpdate(id,resto);
    res.json({
        msg:"Datos actulizados correctamente"
    });

}

const usuarioDelete= async(req,res=response)=>{
    const {id}=req.params;
    console.log(id);
    const usuario= await Usuario.findByIdAndUpdate(id,{estado:false})
    res.json({
        msg:"Usuario deshabilitado correctamente"
    });
}


module.exports={
     usuarioGet,
     usuarioPost,
     usuarioPut,
     usuarioDelete
}