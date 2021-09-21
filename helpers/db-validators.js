


// const { Categoria, Producto } = require('../models');
const { Precio_habitacion } = require('../models');
const Tipo_habitacion = require('../models/habitacion/tipo_habitacion');
const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rote ${rol} no esta registrado en la BD`);
    }
}

const emailExiste = async (correo = '') => {

    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ya esta registrado`)
    }
}

const existeUsuarioPorId = async (id) => {

    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El ID no existe`)
    }
}

const  existeTipoHabitacionPorId = async (tipo_habitacion='') => {

    const existeThabitacion = await Precio_habitacion.findOne({tipo_habitacion});
    if (existeThabitacion) {
        throw new Error('El Tipo de habitacion ya existe')
    }
}


const  existeProductoPorId = async (id) => {

    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El ID no existe`)
    }
}

// Validar colecciones permitidas

const coleccionPermitida=(coleccion='', colecciones=[])=>{
    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error (`La coleccion ${coleccion} no es permitida, ${colecciones}`);
    }

    return true;
}




//existe tipo habitacion

const Tipo_habitacion_Existe = async (categoria = '') => {

    const existeTipoHabitacion = await Tipo_habitacion.findOne({ categoria });
    if (existeTipoHabitacion) {
        throw new Error(`El tipo de habitacion ya esta registrado`)
    }
}

  // esRoleValido,

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeTipoHabitacionPorId,
    existeProductoPorId,
    coleccionPermitida,
    Tipo_habitacion_Existe
}