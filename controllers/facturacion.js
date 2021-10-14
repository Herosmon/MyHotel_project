const { response, request } = require("express");
const pdf = require("html-pdf");
const moment = require("moment");
const { construirPDF } = require("../helpers/generarFacturaPDF");

const { notificacionSis } = require("../helpers/notification");
const { Habitacion, Tipo_habitacion } = require("../models");
const Gasto = require("../models/gasto");
const habitacion = require("../models/habitacion/habitacion");

const Reserva = require("../models/reserva");




const postFacturacion= async (req = request, res = response )=>{
    try {
        const {reserva}= req.params;

        const {nombre,apellido,correo,telefono }=(req.usuario._doc);

        const reservaActual=await Reserva.findById(reserva)
                .populate("habitacion");
   
        const {categoria}= await Tipo_habitacion.findById(reservaActual.habitacion.tipo_habitacion)

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
            tipo_habitacion:{categoria},
            gastosExtra,
            facturacion:{
                valor_total,fecha
            }
        }

        // return res.status(201).json({
        //    data
            
        // })

        pdf.create(construirPDF(data),[,config = {

        "format": "Letter",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
        "orientation": "portrait",

        "border": {
            "top": "2cm",            // default is 0, units: mm, cm, in, px
            "right": "2cm",
            "bottom": "2cm",
            "left": "2cm"
          },
        }]).toStream((error, stream) => {
            if (error) {
                res.end("Error creando PDF: " + error)
            } else {
                res.setHeader("Content-Type", "application/pdf");
                 res.setHeader('Content-Disposition','attachment;filename=factura.pdf');
                stream.pipe(res);
            }
        });


        


    } catch (error) {
        res.status(500).json(notificacionSis(error));
    }
    

}





module.exports={
    postFacturacion,
}