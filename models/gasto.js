const { Schema, model } = require("mongoose");

const GastoSchema = Schema({
  cantidad: {
    type: Number,
    require: [true, "El numero es obligatorio"],
    unique: true,
  },
  valor_total: {
    type: Number,
    require: [true, "El valor total es obligatorio"],
  },
  fecha: {
    type: Date,
    require: [true, "La fecha es obligatoria"],
  },
  servicio: {
    type: Schema.Types.ObjectId,
    ref: "Servicio",
    require: true,
  },
  reserva: {
    type: Schema.Types.ObjectId,
    ref: "Reserva",
    require: true,
  },
});
GastoSchema.methods.toJSON = function () {
  const { __v, _id, ...gasto } = this.toObject();
  gasto.uid = _id;
  return gasto;
};

module.exports = model("Gasto", GastoSchema);
