

const {Router}= require('express');
const { check } = require('express-validator');
const { postTipoHabitacion, getTipoHabitacion, putTipoHabitacion } = require('../controllers/tipo_habitacion');
const { Tipo_habitacion_Existe, existeTipoHabitacionPorId } = require('../helpers/db-validators');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');



const router = Router();



router.get('/',getTipoHabitacion);
router.post('/',
[
    validarJWT,
    esAdminRole,
    check('categoria','La categoria es obligatoria').not().isEmpty(),
    check('categoria').custom(Tipo_habitacion_Existe),
    validarCampos
]
,postTipoHabitacion);

router.put('/:id',[
    validarJWT,
    esAdminRole,
    check("id",'No es un ID valido').isMongoId(),
    check("id").custom(existeTipoHabitacionPorId),
    validarCampos
],putTipoHabitacion)











    module.exports = router;