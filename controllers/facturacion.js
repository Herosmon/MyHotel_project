const { response, request } = require("express");

const moment = require("moment");
const { construirPDF } = require("../helpers/generarFacturaPDF");

const { notificacionSis } = require("../helpers/notification");
const { Habitacion } = require("../models");
const Gasto = require("../models/gasto");

const Reserva = require("../models/reserva");




const postFacturacion= async (req = request, res = response )=>{
    try {
        const {reserva}= req.params;

        const {nombre,apellido,correo,telefono }=(req.usuario._doc);

        const reservaActual=await Reserva.findById(reserva);
        

        const fecha = moment().format("YYYY-MM-D h:mm:ss");
        const gasto= await Gasto.find({reserva}).populate('servicio','nombre')
        let gasto_total=0;
        let gastosExtra=[];
        gasto.map((g)=>{
            gasto_total+=g.valor_total
            gastosExtra.push({
                nombre:g.servicio.nombre,
                precio: g.valor_total,
                fecha:moment(g.fecha).format("YYYY-MM-D"),
                cantidad:g.cantidad

            })
        });
        gastosExtra.push({
            nombre:'',
            fecha:'',
            cantidad:'Total:',
            precio:gasto_total,
        })
        const valor_total=reservaActual.precio+gasto_total

        const data={
            usuario:{ nombre,apellido,correo,telefono   },
            reserva:reservaActual,
            gastosExtra,
            facturacion:{
                valor_total,fecha
            }
        }

        // return res.status(201).json({
        //    data
            
        // })

        const stream= res.writeHead(200,{
            'Content-Type':'application/pdf',
            'Content-Disposition':'attachment;filename=factura.pdf'
        });

        construirPDF(
            (chunk)=>stream.write(chunk),
            ()=>stream.end(),
            data

        )



    } catch (error) {
        res.status(500).json(notificacionSis(error));
    }
    

}



module.exports={
    postFacturacion,
}