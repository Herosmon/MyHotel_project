const {Router}= require('express');
const { check } = require('express-validator');
const { postReserva, putCancelarReserva, getReservaCliente, getReservaEspecifica } = require('../controllers/reserva');
const { existeTipoHabitacionPorId, existeReservaPorId } = require('../helpers/db-validators');
const { validarJWT, tieneRole, validarCampos } = require('../middlewares');


const router = Router();

router.post('/',[
    validarJWT,
    tieneRole('USER'),
    check('fecha_inicio','la fecha de inicio de la reserva en obligatoria').notEmpty(),
    check('fecha_fin','la fecha de cierre de la reserva en obligatoria').notEmpty(),
    check('tipo_habitacion','el id de tipo de habitacion de obligatorio').notEmpty(),
    check('tipo_habitacion','el id de tipo de habitacion debe ser valido').isMongoId(),
    check('tipo_habitacion').custom(existeTipoHabitacionPorId),
    validarCampos
]
,postReserva)




router.put('/cancelar/:id',[
    validarJWT,
    tieneRole('USER'),
    validarCampos
], putCancelarReserva);

router.get('/',[
    validarJWT,
    tieneRole('USER'),
    validarCampos
], getReservaCliente)



router.get('/:id',[
    // validarJWT,
    // esAdminRole,
    check("id",'No es un ID valido').isMongoId(),
    check("id").custom(existeReservaPorId),
    validarCampos
]
,getReservaEspecifica);

module.exports = router;