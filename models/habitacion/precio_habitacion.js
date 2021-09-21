const { Schema, model } = require("mongoose");

const Precio_habitacionSchema = Schema({
  precio: {
    type: Number,
    require: [true, "El precio es obligatorio"],
  },
  tipo_habitacion:{
      type:  Schema.Types.ObjectId,
      ref:"Tipo_habitacion",
      require: true
  }
  
});
Precio_habitacionSchema.methods.toJSON=function(){
  const{__v,_id,...precio}=this.toObject();
  precio.uid=_id;
  return precio;
}

module.exports = model("Precio_habitacion", Precio_habitacionSchema);
