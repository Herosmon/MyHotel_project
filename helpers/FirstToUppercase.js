

const firstUpper=(data)=>{
   
    data=data.trim().split(' ');

   const first = data.map(palabra=>{
               const p= palabra.toLowerCase();
     return    p.charAt(0).toUpperCase()+p.slice(1)
       
    })
    
   return (first.toString().replace(',',' '));
    
}

module.exports={
    firstUpper
}