const {Router}= require('express');
const { check } = require('express-validator');
const { postPrecioHabitacion, precioHabitacionGet } = require('../controllers/precio_habitacion');
const {  existeTipoHabitacionPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares');



const router= Router();

router.get('/',precioHabitacionGet);

router.post('/',
[
    check('precio','La categoria es obligatoria').not().isEmpty(),
    check('tipo_habitacion').isMongoId(),
     check('tipo_habitacion').custom(existeTipoHabitacionPorId),
    validarCampos
]
,postPrecioHabitacion)

module.exports = router;