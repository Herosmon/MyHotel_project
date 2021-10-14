const {Router}= require('express');
const { check } = require('express-validator');
const { postFacturacion, getFacturaPago, getListaFacturas } = require('../controllers/facturacion');
const { validarCampos, validarJWT, tieneRole} = require('../middlewares');


const router = Router();

router.post('/:reserva',
[
    validarJWT,
    tieneRole('USER'),
    validarCampos
]
,postFacturacion)



router.get('/:factura',
[
    validarJWT,
    tieneRole('USER'),
    validarCampos
]
,getFacturaPago)


router.get('/',
[
    validarJWT,
    tieneRole('USER'),
    validarCampos
]
,getListaFacturas)



module.exports = router;