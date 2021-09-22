const { Schema, model } = require("mongoose");

const ReservaSchema = Schema({
  fechaInicio: {
    type: Date,
    require: ["true", "La fecha de inicio es requerida"],
  },
  fechaFin: {
    type: Date,
    require: ["true", "La fecha de finalización es requerida"],
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    require: true,
  },
  habitacion: {
    type: Schema.Types.ObjectId,
    ref: "Habitacion",
    require: true,
  },
});
ReservaSchema.methods.toJSON=function(){
    const{__v,_id,...reserva}=this.toObject();
    reserva.uid=_id;
    return reserva;
}

module.exports = model("Reserva", ReservaSchema);
