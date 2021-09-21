const { Schema, model } = require("mongoose");

const HabitacionSchema = Schema({
  numero: {
    type: Number,
    require: [true, "El precio es obligatorio"],
  },
  tipo_habitacion:{
      type:  Schema.Types.ObjectId,
      ref:"Tipo_habitacion",
      require: true
  }
  
});

module.exports = model("Habitacion", HabitacionSchema);
