const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require ('jsonwebtoken' );
const { generarResetJWT,generarJWT } = require("../helpers/generar-jwt");
const Usuario= require("../models/usuario");
const {transporter}=require("../helpers/mailer")
const path= require('path')

const login_cliente = async (req,res=response)=>{
    const {correo,clave}=req.body;
    try {
        //verificar si correo existe
        const usuario= await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: "Usuario o Contraseña no son correctos - correo",
            });
        }
        //verificar estado del cliente
        if(!usuario.estado){
            return res.status(400).json({
                msg: "Usuario o Contraseña no son correctos - estado: false",
            });
        }
        //verificar clave
        const validarClave=bcryptjs.compareSync(clave, usuario.clave);
        if(!validarClave){
            return res.status(400).json({
                msg: "Usuario o Contraseña no son correctos - clave",
            });
        }
        const token= await generarJWT(usuario.id);
        res.status(200).json({
            msg: "Login ok",
            cliente: usuario,
            token
            
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con  el admin",
        });
        
    }
};


const menu_recuperar_contraseña= async  (req,res=response)=>{

    res.sendFile(path.resolve(__dirname,'../public/forgot_password.html'))
}

const recuperar_contraseña= async  (req,res=response)=>{
    const {c} = req.params;
    console.log(c);
  
    const token=c;
    const{newPassword}=req.body
    console.log(newPassword);
    if(!(token && newPassword) ){
       
      return  res.status(400).json({
            msg:"Todos los campos son requeridos"
            
        })
        
    }
    
 try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    
    if(!uid){
        return res.status(402).json({msg:"Error - Token"})
    }
    let reset=token
    if(!await Usuario.findById(uid,{reset})){
        return res.status(402).json({msg:"Error - crendenciales"})
    }
   

    const salt = bcryptjs.genSaltSync(10);
    clave = bcryptjs.hashSync(newPassword, salt);
     reset="";
    await Usuario.findByIdAndUpdate(uid,{clave,reset})

    res.status(201).json({
        msg:"Clave cambiada con exito"
    })


 } catch (error) {
     return res.status(401).json({msg:"Error "})
 }
}



const olvido_contraseña= async  (req=require,res=response)=>{
    const {correo}=req.body;
    if(!correo){
        return res.status(400).json({
            msg:"Correo es obligatorio"
        });
    }
    const message="Revisa tu correo";
    let reset;
    let emailStatus ='OK';

    try {
        const  usuario= await Usuario.findOne({correo})
        if(!usuario){
            return res.status(404).json({msg:'Datos no validos'})
        }
    
        const token= await generarResetJWT(usuario.id);
        reset=`http://localhost:8080/myhotel/auth/recuperar/${token}`
        const actualizado=await Usuario.findByIdAndUpdate(usuario.id,{reset})

        if(!actualizado){
            return res.status(400).json({
                msg:"Error al intentar recuperar contraseña"
            })
        }

        //enviar Email
        try {
             await transporter.sendMail({
                from: '"Recuperar Contraseña" <jdmorenov@correo.udistrital.edu.co>', 
                to: usuario.correo, // list of receivers
                subject: "Recuperar Contraseña", // Subject line
               
                html: `
                    <b>Please click on the following link</b>
                    <a href='${reset}'>Link Verificación</a>
                `
              });
        } catch (error) {
            return  res.status(400).json({msg:"Error al enviar correo"})
        }


        return res.status(200).json({
            message,
        })

    } catch (error) {
        return res.json({message})
    }

}

module.exports = {
    login_cliente,
    menu_recuperar_contraseña,
    olvido_contraseña,
    recuperar_contraseña
};
