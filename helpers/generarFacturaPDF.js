
const PdfkitConstruct = require('pdfkit-construct');

const construirPDF =(dataCallback,endCallback,data)=>{

    
    
        
    const doc = new PdfkitConstruct({
        size: 'A4',
        margins: {top: 50, left: 40, right: 40, bottom: 40},
        bufferPages: true,
        
    });

    doc.on('data',dataCallback);
    doc.on('end',endCallback);

 
   const {gastosExtra}= data;


   
   
     
    doc.setDocumentHeader({height : "43%"}, () => {
        // doc.lineJoin('miter')
        // .rect(0, 0, doc.page.width, doc.header.options.heightNumber).fill("#ededed");

        doc.fontSize(30)
        .text('MyHotel', 60, 100, {align: 'left'});
    doc.fontSize(12)
        .text('Numero de factura: 123456', 60, 100, {align: 'right'});
        doc
        .text('Fecha Factura: 2021-10-22', {align: 'right'});
        doc.moveDown();
        doc.moveDown();
       

        doc.fontSize(18)
        doc.text(`Cliente`, {
          width: 270,
          align: 'left'
        });
        
        doc.fontSize(15)
        .text('Nombres: Santiago', {align: 'left'});
        doc.text('Apellidos: Vergara', {align: 'left'});
        doc.text('correo: santiago@gmail.com', {align: 'left'}); 


        doc.moveDown();


        doc.fontSize(18)
        doc.text(`Reserva`, {
          width: 270,
          align: 'left'
        });

        doc.fontSize(15)
        .text('Numero de reserva: 1241231', 60,280, {align: 'left'});
        doc.text('Tipo de habitacion: Sencilla',60,300, {align: 'left'});
        doc.text('Fecha inicio: 2021-10-12',60,320, {align: 'left'});
        doc.text('Fecha finalización: 2021-10-12',60,340, {align: 'left'}); 
        doc.moveDown();
        doc.fontSize(15).text('Valor de la reserva',300,300, {align: 'right'}); 
        doc.fontSize(15).text('$500.000',300,320, {align: 'right'}); 
        
        doc.moveDown();
       

      
        
        doc.fontSize(18)
        doc.text(`Gastos Extra`,
        60,380,
        {
          width: 270,
          align: 'left'
        });

                
    });
    
doc.addTable([
    {key:'nombre',label:'nombre',align:'center'},
    {key:'fecha',label:'fecha',align:'center'},
    {key:'cantidad',label:'cantidad',align:'center'},
    {key:'precio',label:'precio',align:'center'},

],gastosExtra,
{
    border: null,
    width: "fill_body",
    striped: true,
    // border : {size: 0.1, color: '#cdcdcd'},
    
    headBackground : '#FBFCFC',
    stripedColors: ["#19d2d2", "#FBFBFC"],
    headFont : "Helvetica-Bold",
    headFontSize : 12,
    headHeight : 10,
    cellsFont : "Helvetica",
    cellsPadding: 10,
    cellsFontSize : 12,
    marginLeft: 45,
    marginRight: 45,
    headAlign: 'center'
})
        

   
      doc.render();
doc.end();
  
        
   
}


module.exports= {construirPDF}
