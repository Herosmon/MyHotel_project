const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "error",
      description:"no hay token en la petición"
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const usuario = await Usuario.findById(uid);

    if(!usuario){
        return res.status(401).json({
            msg: "error",
            description: "token no valido -usuario no existe"
          });
    }


    // verificar si el uid tiene estado true
    if(!usuario.estado){
        return res.status(401).json({
            msg: "error",
            description:"token no valido -usuario con estado: false"
          });
    }

    req.usuario = usuario;
    next();
    
  } catch (error) {
    console.log(error);

    res.status(401).json({
      msg: "error",
      description:"token no valido"
    });
  }
};

module.exports = {
  validarJWT,
};
