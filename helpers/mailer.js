
const nodemailer = require("nodemailer");



 
  const  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_MAILER, // generated ethereal user
      pass: process.env.PASSWORD_MAILER, // generated ethereal password
    },
  });


  transporter.verify().then(()=>{
      console.log("Listos para enviar emails");
  })

  module.exports={
    transporter
  }