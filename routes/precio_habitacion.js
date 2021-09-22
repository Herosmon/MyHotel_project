const { Router } = require("express");
const { check } = require("express-validator");
const {
  postPrecioHabitacion,
  getprecioHabitacion,
  putPrecio,
} = require("../controllers/precio_habitacion");
const {
  existeTipoHabitacion,
  existeTipoHabitacionPorId,
  existePrecioHabitacionPorId,
} = require("../helpers/db-validators");
const { validarCampos, validarJWT, esAdminRole } = require("../middlewares");

const router = Router();

router.get("/", getprecioHabitacion);

router.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("precio", "La categoria es obligatoria").not().isEmpty(),
    check("tipo_habitacion").isMongoId(),
    check("tipo_habitacion").custom(existeTipoHabitacion),
    validarCampos,
  ],
  postPrecioHabitacion
);

router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existePrecioHabitacionPorId),
    validarCampos,
  ],
  putPrecio
);

module.exports = router;
