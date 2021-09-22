const {Router}= require('express');
const { check } = require('express-validator');
const {  usuarioPost, usuarioPut , usuarioGet, usuarioDelete } = require('../controllers/usuario');
const { validarCampos ,validarJWT, tieneRole, esAdminRole } = require('../middlewares');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router= Router();

router.get('/',usuarioGet);

router.post('/',
    [
       
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('apellido', 'El apellido es obligatorio').notEmpty(),
        check('correo', 'El correo ingresado no es valido').isEmail(),
        check('correo').custom(emailExiste),
        check('clave', 'La clave debe tener al menos 6 letras').isLength({ min: 6 }),
        check('rol').custom(esRoleValido),
        validarCampos
    ],
    usuarioPost);


    router.put('/:id',
    [  
        validarJWT,
        tieneRole('USER'),
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos,
    ],usuarioPut);


    
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
], usuarioDelete);

    
module.exports = router;