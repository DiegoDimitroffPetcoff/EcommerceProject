const dataUser = require("../routes/productRoute");
const nodemailer = require("nodemailer");
const TEST_MAIL = process.env.TEST_MAIL ||"diegodimitroffpetcoff@gmail.com";
const log4js = require("log4js");


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: TEST_MAIL,
    type: "OAuth2",
    clientId: process.env.CLIENT_ID ||"911738212473-n37i4clrtuf90c2m7dvlku12jojqb7el.apps.googleusercontent.com",
    clientSecret:process.env.CLIENT_SECRET ||"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",
    refreshToken:process.env.REFRESH_TOKEN ||"1//04jgf7YQDvTiyCgYIARAAGAQSNwF-L9Ir0pOWRTBzqHIwJWSHlGR_QL6XB2EzsbSPRWXZDF1IOQsTxjqEI2tKH6LcD4zL1j9U4_I",
    accessToken:process.env.ACCESS_TOKEN ||"ya29.A0AVA9y1uWGn8nBG7Ai1rksjxr7Q3cvinXDnFNS_7I1FoVETcjPmCzXJOgT1IoICn-q9DL942evdbEyDmuILnYkKQjoe3ej44eNYk9uKgWJOHQ6P62r1tQiLerM8cyyPi50-ZQ2FTSSKycESMP9c5AMARqfXsbYUNnWUtBVEFTQVRBU0ZRRTY1ZHI4QXFFOGcwdEZpaDA2RUZZaEFGblpzZw0163",
  },
});


async function sendEmail(userWithId, mailOptions) {
  try {
    const info = await transporter.sendMail(mailOptions);
    const logger = log4js.getLogger("info");
    logger.info("Correo enviado Correctamente")
  } catch (error) {
    console.log("NO SE PUDO MANDAR EL E MAIL")
    console.log(error);
  }
}


function renderMsj(productos, nombre) {
  let HTML = `<h1>${nombre} Muchas gracias por tu compra!</h1> 
  
  Esta es la lista de los productos que has adquirido.
   ` 
  productos.forEach(elem => {    
  HTML += `
          <h4>Produto: ${elem.title} </h4>
          <h5>Precio: $${elem.price}</h5>
          - `});
  HTML +=`<h3>Tu compra ya esta en camino!</h3>
  <h5>Compra realizada desde la Aplicacion Proyecto de CoderHouse</h5>
  <h6>© Diego Dimitroff Petcoff 2022 Nerver Stop</h6>`
  
  
  return HTML
}

function renderMsjSmsWap(productos, nombre) {
  let HTML = `${nombre} Muchas gracias por tu compra! 
  
  Esta es la lista de los productos que has adquirido.
   ` 
  productos.forEach(elem => {    
  HTML += `
          Produto: ${elem.title} 
          Precio: $${elem.price}
          - `});
  HTML +=`Tu compra ya esta en camino!
  Compra realizada desde la Aplicacion Proyecto de CoderHouse
  © Diego Dimitroff Petcoff 2022 Nerver Stop`
  
  
  return HTML
}

function renderMsjAdministrator(productos, usuario) {
  let HTML = `<h1>Compra realizada</h1> 
  <h2>Info del usuario:</h2> <br>
  <h3>Usuario:</h3> ${usuario.username},
  <h3>Apellido:</h3> ${usuario.firstName},<br>
  <h3>Nombre:</h3> ${usuario.lastName},<br>
  <h3>Edad: </h3>${usuario.age},<br>
  <h3>Numero de Telefono:</h3> ${usuario.phonenumber},<br>
  <h3>E-mail:</h3> ${usuario.email},<br>
  <h3>Avatar:</h3> ${usuario.avatar}
  
 
  -------------------------------------------------------

  <h2>Esta es la lista de los productos que el cliente ha adquirido.</h2>
   ` 
  productos.forEach(elem => {    
  HTML += `
          <h4>Produto: ${elem.title} </h4>
          <h5>Precio: $${elem.price}</h5>
          <h5>${elem.id}</h5>
          ------------------------------ `});
  HTML +=`
  <h6>© Diego Dimitroff Petcoff 2022 Nerver Stop</h6>`
  
  
  return HTML
}

module.exports = {sendEmail, renderMsj, renderMsjAdministrator,renderMsjSmsWap};
