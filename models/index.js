const Server = require("./server");
const Rol = require("./rol");
const Usuario = require("./usuario");
const Habitacion = require("./habitacion/habitacion");
const Tipo_habitacion = require("./habitacion/tipo_habitacion");
const Precio_habitacion = require("./habitacion/precio_habitacion");

module.exports = {
  Server,
  Rol,
  Usuario,
  Habitacion,
  Tipo_habitacion,
  Precio_habitacion,
};
