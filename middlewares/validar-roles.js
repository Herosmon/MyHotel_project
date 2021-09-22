const { request, response, json } = require("express")


const esAdminRole =(req=request,res=response, next)=>{

   if(! req.usuario){
       return res.status(500).json({
           msg:"error",
           description : 'Se quiere verificar ron sin el token'
       })
   }
   const {rol,nombre}= req.usuario;

   if(rol!=='ADMIN'){
       return res.status(401).json({
            msg:"error",
           description: `${nombre} no es administrador `
       })
   }

    next();
}


const tieneRole=(...roles)=>{

    return (req=request,res=response, next)=>{
        if(! req.usuario){
            return res.status(500).json({
                msg:"error",
                description : 'Se quiere verificar ron sin el token'
            });
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg:"error",
                description: `El servicio requiere uno de estos roles ${roles} `
            });
        }
        next();
    }
}

module.exports={
    esAdminRole,
    tieneRole
}