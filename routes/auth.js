const {Router}= require('express');
const { check } = require('express-validator');
const { login_cliente, menu_recuperar_contraseña, olvido_contraseña, recuperar_contraseña} = require('../controllers/auth');
const { validarCampos } = require('../middlewares');

const { postRol} = require('../controllers/role');
const tipo_habitacion = require('../models/habitacion/tipo_habitacion');
const { postTipoHabitacion } = require('../controllers/tipo_habitacion');
const { Tipo_habitacion_Existe } = require('../helpers/db-validators');
const { postPrecioHabitacion } = require('../controllers/precio_habitacion');



const router = Router();

router.post('/login',
    [
        check('correo','El correo es obligatorio').isEmail(),
        check('clave','La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ]
    ,login_cliente);


  router.get('/recuperar/:id',menu_recuperar_contraseña)

  router.put('/olvido',
  [
    check('correo','El correo es obligatorio').isEmail()
  ]
  ,olvido_contraseña);


router.put('/recuperar/:c',
[ check('newPassword','La contraseña es obligatoria').not().isEmpty(),]
,recuperar_contraseña)


    module.exports = router;