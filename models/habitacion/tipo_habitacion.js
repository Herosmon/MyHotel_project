const { Schema, model } = require("mongoose");

const Tipo_habitacionSchema = Schema({
  categoria: {
    type: String,
    require: [true, "La categoria es obligatoria"],
    unique: true,
  },
  camas: {
    type: Number,
    require: [true, "La cantidad de camas en obligatoria"],
  },
  terraza: {
    type: Boolean,
    default: false,
  },
  precio: {
    type: Number,
    require: [true, "El precio es obligatorio"],
  },
  img: {
    type: String,
  },
  estado: {
    type: Boolean,
    default: true,
  },
});
Tipo_habitacionSchema.methods.toJSON = function () {
  const { __v, _id, ...tipo } = this.toObject();
  tipo.uid = _id;
  return tipo;
};

module.exports = model("Tipo_habitacion", Tipo_habitacionSchema);
