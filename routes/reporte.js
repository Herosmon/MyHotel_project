const {Router}= require('express');
const { check } = require('express-validator');
const { getReporteServicio } = require('../controllers/reporte');

const { validarCampos, validarJWT, esAdminRole, tieneRole} = require('../middlewares');


const router = Router();

router.get('/servicio',
[
    // validarJWT,
    // tieneRole('ADMIN','AUX')
]
,getReporteServicio)

module.exports = router;