const path= require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo= (files, extensionesValidas=['png','jpg','jpeg','gif'], carpeta='')=>{
  
    return new Promise((resolve,reject)=>{
        const {archivo} = files;
  
        //nombre archivo
        const nombreCortado= archivo.name.split('.');
        const extension= nombreCortado[nombreCortado.length-1]
    
        //validar la extensión
   
        if(!extensionesValidas.includes(extension)){
            return reject( `La extension ${extension} no es permitida. Extensiones validas: ${extensionesValidas}`);
            
        }
        
     // renombrar imagen
    
        const nombreTemp= uuidv4()+'.'+extension; 
        const uploadPath = path.join( __dirname , '../uploads/' , carpeta,nombreTemp);
    
      
        archivo.mv(uploadPath, (err)=> {
          if (err) {
            reject(err);
          }
      
          resolve( nombreTemp);
        });
        
    });
    
    
    
     
  
   
  
  
  
  
}


module.exports={
    subirArchivo
}