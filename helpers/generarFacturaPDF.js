
const moment = require("moment");
const fs = require("fs");

const ubicacionPlantilla = require.resolve("./pdf.html");
const construirPDF =(data)=>{
    var html = fs.readFileSync(ubicacionPlantilla,'utf8');

    const {usuario,reserva,gastosExtra,facturacion,tipo_habitacion}=data
    // console.log(data);
   html = html
   .replace('{{fecha_factura}}',facturacion.fecha)
   .replace('{{nombre_cliente}}',usuario.nombre)
   .replace('{{apellido_cliente}}',usuario.apellido)
   .replace('{{correo_cliente}}',usuario.correo)

   .replace('{{numero_reserva}}',reserva.id)
   .replace('{{tipo_habitacion}}',tipo_habitacion.categoria)
   .replace('{{fechaInicioReserva}}',moment(reserva.fechaInicio).format("YYYY-MM-D"))
   .replace('{{fechaFinReserva}}',moment(reserva.fechaFin).format("YYYY-MM-D"))
   .replace('{{precio_reserva}}',reserva.precio+'COP')



//    console.log(html);

    html+=`<table class="default" style="margin: 2cm;">

    <tr>
  
      <td>Celda 1</td>
  
      <td>Celda 2</td>
  
      <td>Celda 3</td>
  
    </tr>
  
    <tr>
  
      <td>Celda 4</td>
  
      <td>Celda 5</td>
  
      <td>Celda 6</td>
  
    </tr>
  
  </table>` 
    return html
   
}


module.exports= {construirPDF}
