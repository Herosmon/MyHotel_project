

const {Router}= require('express');
const { check } = require('express-validator');
const { postTipoHabitacion, GetTipoHabitacion } = require('../controllers/tipo_habitacion');
const { Tipo_habitacion_Existe } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares');



const router = Router();



router.get('/',GetTipoHabitacion);
router.post('/',
[
    check('categoria','La categoria es obligatoria').not().isEmpty(),
    check('categoria').custom(Tipo_habitacion_Existe),
    validarCampos
]
,postTipoHabitacion)











    module.exports = router;