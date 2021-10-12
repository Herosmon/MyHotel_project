const { Router } = require("express");
const { check } = require("express-validator");
const { postHabitacion, getHabitacionLibre, putHabitacion, getHabitacionLibrePorTipo, deleteHabitacion, getHabitacionEspecifico } = require("../controllers/habitacion");
const { existeNumeroHabitacion, existeTipoHabitacionPorId, esRoleValido, existeHabitacionPorId } = require("../helpers/db-validators");
const { validarJWT, esAdminRole, validarCampos, tieneRole } = require("../middlewares");




const router = Router();


router.post(
    "/",
    [
        validarJWT,
        esAdminRole,
        check('numero',"El numero de habitacion es obligatorio").not().isEmpty(),
        check('numero').custom(existeNumeroHabitacion),
        check('tipo_habitacion').isMongoId(),
        check('tipo_habitacion').custom(existeTipoHabitacionPorId),
        validarCampos
    ]
    ,postHabitacion
)

router.get(
    "/",
    getHabitacionLibre
)

router.get(
    "/tipo/:id",
    [check('id').isMongoId(),]
    ,getHabitacionLibrePorTipo
)

router.get('/:id',[
    // validarJWT,
    // esAdminRole,
    check("id",'No es un ID valido').isMongoId(),
    check("id").custom(existeHabitacionPorId),
    validarCampos
]
,getHabitacionEspecifico);


router.put(
    "/:id",
    [
        validarJWT,
        tieneRole('ADMIN','AUX'),
        check("id",'No es un ID valido').isMongoId(),
        check("id").custom(existeHabitacionPorId),
        validarCampos
    ]
    ,putHabitacion
    )


    router.delete('/:id', [
        validarJWT,
        tieneRole('ADMIN','AUX'),
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeHabitacionPorId),
        validarCampos,
    ], deleteHabitacion);
    

module.exports = router;
