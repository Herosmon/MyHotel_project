
 const jsPDF = require('jspdf')


const construirPDF =(data)=>{

   

    const doc = new jsPDF();
  
    // PDF building code goes here, e.g.
    
    doc.setFontSize(40)
    doc.text(35, 25, 'jsPDF *can* be made to work with Express!')
  
    const myPDF = doc.output()

    return myPDF;
}

module.exports= {construirPDF}
