const {Router}= require('express');
const { check } = require('express-validator');
const { getReporteServicio, getReporteTipoHabitacionHotel, getReporteClienteFrecuente } = require('../controllers/reporte');

const { validarCampos, validarJWT, esAdminRole, tieneRole} = require('../middlewares');


const router = Router();

router.get('/servicio',
[
    // validarJWT,
    // tieneRole('ADMIN','AUX')
]
,getReporteServicio)


router.get('/tipo_habitacion',
[
    // validarJWT,
    // tieneRole('ADMIN','AUX')
]
,getReporteTipoHabitacionHotel)


router.get('/cliente_frecuente',
[
    // validarJWT,
    // tieneRole('ADMIN','AUX')
]
,getReporteClienteFrecuente)


module.exports = router;