const { Schema, model } = require ('mongoose');


const UsuarioSchema= Schema({

    identificacion:{
        type:String,
        require:false,
        default:''
    },
    nombre:{
        type: String,
        require: [true, 'El nombre es obligatorio' ]
    },
    apellido:{
        type: String,
        require: [true, 'El nombre es obligatorio' ]
    },
    correo:{
        type: String,
        require: [true, 'El correo es obligatorio' ],
        unique: true
    },
    clave:{
        type: String,
        require: [true, 'La contraseña es obligatoria' ],
    },
    telefono:{
        type: String,
        require:false,
        default:''
    },
    img:{
        type: String,
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    },
    rol:{
        type: String,
        default: 'USER',
        emun:['ADMIN','AUX']
    },
    reset:{
        type: String,
        default: ''
    }
});

UsuarioSchema.methods.toJSON=function(){
    const{__v,clave,_id,...usuario}=this.toObject();
    usuario.uid=_id;
    return usuario;
}

module.exports=model('Usuario',UsuarioSchema);