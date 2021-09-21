const {Router}= require('express');
const { check } = require('express-validator');
const { postRol } = require('../controllers/role');
const { validarCampos} = require('../middlewares');


const router= Router();

router.post('/',
[
    check('rol','El rol es obligatorio').not().isEmpty(),
    validarCampos
]
,postRol)

module.exports = router;