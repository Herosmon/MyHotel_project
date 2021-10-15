const { response, request } = require("express");
const moment = require("moment");
const { notificacionSis } = require("../helpers/notification");
const { Habitacion } = require("../models");
const Facturacion = require("../models/facturacion");
const Gasto = require("../models/gasto");



const getReporteServicio = async (req, res = response) => {

   const  dataSet= await Gasto.aggregate([
    {$group : {_id :  "$servicio",total: { $sum: "$cantidad" }}},
    {$lookup: {from: "servicios", localField: "_id", foreignField: "_id", as: "details"}} ]);
   
    let topServicios=[];
   dataSet.map((data)=>{
    topServicios.push({
        nombre:data.details[0].nombre,
        total:data.total
    })
   })
   
   topServicios=topServicios.sort(((a,b)=> b.total - a.total))

    return res.json({
        topServicios
    })

};

const getReporteTipoHabitacionHotel =async(req, res = response) => {

    const dataSet = await Habitacion.aggregate([
        {$group : {_id :  "$tipo_habitacion",total: { $sum: 1 }}},
        {$lookup: {from: "tipo_habitacions", localField: "_id", foreignField: "_id", as: "details"}} ]);

        let topTipoHabitacion=[];
        dataSet.map((data)=>{
            topTipoHabitacion.push({
             categoria:data.details[0].categoria,
             total:data.total
         })
        })
        topTipoHabitacion=topTipoHabitacion.sort(((a,b)=> b.total - a.total))
        return res.json({
            topTipoHabitacion
        })
}

const getReporteClienteFrecuente =async(req, res = response) => {

    const dataSet= await Facturacion.aggregate([
        {$group : {_id :  "$usuario",total: { $sum: 1 }}},
        {$lookup: {from: "usuarios", localField: "_id", foreignField: "_id", as: "details"}} ]);

        let topClienteFrecuente=[];
        dataSet.map((data)=>{
            topClienteFrecuente.push({
             nombre:data.details[0].nombre+''+data.details[0].apellido,
             total_visitas:data.total
         })
        })



        return res.json({
            topClienteFrecuente
        })

}



module.exports={
    getReporteServicio,
    getReporteTipoHabitacionHotel,
    getReporteClienteFrecuente
}
