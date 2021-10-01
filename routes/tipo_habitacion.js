

const {Router}= require('express');
const { check } = require('express-validator');
const { postTipoHabitacion, getTipoHabitacion, putTipoHabitacion, deleteTipoHabitacion, getTipoHabitacionEspecifico } = require('../controllers/tipo_habitacion');
const { Tipo_habitacion_Existe, existeTipoHabitacionPorId } = require('../helpers/db-validators');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');



const router = Router();



router.get('/',getTipoHabitacion);


router.get('/:id',[
    // validarJWT,
    // esAdminRole,
    check("id",'No es un ID valido').isMongoId(),
    check("id").custom(existeTipoHabitacionPorId),
    validarCampos
]
,getTipoHabitacionEspecifico);

router.post('/',
[
    validarJWT,
    esAdminRole,
    check('categoria','La categoria es obligatoria').not().isEmpty(),
    check('categoria').custom(Tipo_habitacion_Existe),
    check('precio','El precio es obligatorio').not().isEmpty(),
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

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeTipoHabitacionPorId),
    validarCampos,
], deleteTipoHabitacion);










    module.exports = router;