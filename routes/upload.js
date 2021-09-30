const { Router } = require('express');
const { check } = require('express-validator');
const { actualizarImagenCloudinary} = require('../controllers/uploads');
const { coleccionPermitida } = require('../helpers/db-validators');
const { validarArchivoSubir, validarCampos } = require('../middlewares');

const router= Router();

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','El ID debe de ser mongo').isMongoId(),
     check('coleccion').custom(c=>coleccionPermitida(c,['usuario', 'tipo_habitacion'])),
    validarCampos
],actualizarImagenCloudinary);


module.exports= router;
