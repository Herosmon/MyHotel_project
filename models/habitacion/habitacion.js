const { Schema, model } = require("mongoose");

const HabitacionSchema = Schema({
  numero: {
    type: Number,
    require: [true, "El numero es obligatorio"],
  },
  tipo_habitacion:{
      type:  Schema.Types.ObjectId,
      ref:"Tipo_habitacion",
      require: true
  },
  ocupado:{
    type: Boolean,
    default: false,
  },
  
  
});
HabitacionSchema.methods.toJSON=function(){
  const{__v,_id,...habitacion}=this.toObject();
  habitacion.uid=_id;
  return habitacion;
}

module.exports = model("Habitacion", HabitacionSchema);
