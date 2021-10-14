const {Router}= require('express');
const { check } = require('express-validator');
const { postGasto } = require('../controllers/gasto');
const { validarCampos, validarJWT, tieneRole} = require('../middlewares');


const router = Router();

router.post('/:reserva',
[
    validarJWT,
    tieneRole('USER'),
    check('reserva','El id de reserva es obligatorio').not().isEmpty(),
    check('reserva','El id de reserva no es valido').isMongoId(),
    check('servicio','El id de reserva es obligatorio').not().isEmpty(),
    check('servicio','El id de reserva no es valido').isMongoId(),
    validarCampos
]
,postGasto)

module.exports = router;