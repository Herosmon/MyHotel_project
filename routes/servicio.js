const {Router}= require('express');
const { check } = require('express-validator');
const { postServicio, getServicio, putServicio, deleteServicio } = require('../controllers/servicio');
const { existeServicioPorNombre, existeServicioPorId } = require('../helpers/db-validators');
const { validarCampos, validarJWT, esAdminRole} = require('../middlewares');



const router = Router();

router.get('/',getServicio)



router.post('/',
[
    // validarJWT,
    // esAdminRole,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('descripcion','La descripcion es obligatoria').not().isEmpty(),
    check('precio','El precio es obligatorio').not().isEmpty(),
    check('nombre').custom(existeServicioPorNombre),
    validarCampos
]
,postServicio)


router.put('/:id',[
    check('id','El Id es obligatorio').not().isEmpty(),
    check('id','El id no es valido').isMongoId(),
    check('id').custom(existeServicioPorId),
    validarCampos
],putServicio)

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeServicioPorId),
    validarCampos,
], deleteServicio);

module.exports = router;