const {Router}= require('express');
const { check } = require('express-validator');
const { postFacturacion } = require('../controllers/facturacion');
const { validarCampos, validarJWT, tieneRole} = require('../middlewares');


const router = Router();

router.post('/:reserva',
[
    validarJWT,
    tieneRole('USER'),
    validarCampos
]
,postFacturacion)

module.exports = router;