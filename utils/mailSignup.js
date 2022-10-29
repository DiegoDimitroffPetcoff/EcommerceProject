const dataUser = require("../routes/routes");
const nodemailer = require("nodemailer");
const TEST_MAIL = process.env.TEST_MAIL || "diegodimitroffpetcoff@gmail.com";
const log4js = require("log4js");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: TEST_MAIL,
    type: "OAuth2",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN
  },
});

async function sendEmail(userWithId, mailOptions) {
  try {
    const info = await transporter.sendMail(mailOptions);
    const logger = log4js.getLogger("info");
    logger.info("E-mail enviado de manera correcta");
  } catch (error) {
    console.log("NO SE PUDO MANDAR EL E MAIL");
    console.log(error);
  }
}

async function renderMsj(productos, nombre) {
  let HTML = `<h1>${nombre} Muchas gracias por tu compra!</h1> 
  
  Esta es la lista de los productos que has adquirido.
   `;

 await productos.forEach((elem) => {
    HTML += `
          <h4>Produto: ${elem.title} </h4>
          <h5>Precio: $${elem.price}</h5>
          - `;
  });
  HTML += `<h3>Tu compra ya esta en camino!</h3>
  <h5>Compra realizada desde la Aplicacion Proyecto de CoderHouse</h5>
  <h6>© Diego Dimitroff Petcoff 2022 Nerver Stop</h6>`;

  return HTML;
}

async function renderMsjWapAdministrator(productos, nombre) {
  let HTML = `MENSAJE PARA ADMINISTRADOR
  ${nombre} Realizo una nueva compra 
  Productos comprados:
   `;
  await productos.forEach((elem) => {
    HTML += `
          Produto: ${elem.title} 
          Precio: $${elem.price}
          - `;
  });
  HTML += `
  Compra realizada desde la Aplicacion Proyecto de CoderHouse
  © Diego Dimitroff Petcoff 2022 Nerver Stop`;

  return HTML;
}

async function renderMsjSmsWap(productos, nombre) {
  let HTML = `${nombre} Muchas gracias por tu compra! 
  
  Esta es la lista de los productos que has adquirido.
   `;
  await productos.forEach((elem) => {
    HTML += `
          Produto: ${elem.title} 
          Precio: $${elem.price}
          - `;
  });
  HTML += `Tu compra ya esta en camino!
  Compra realizada desde la Aplicacion Proyecto de CoderHouse
  © Diego Dimitroff Petcoff 2022 Nerver Stop`;

  return HTML;
}

async function renderMsjAdministrator(productos, usuario) {
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
   `;
  await productos.forEach((elem) => {
    HTML += `
          <h4>Produto: ${elem.title} </h4>
          <h5>Precio: $${elem.price}</h5>
          <h5>${elem.id}</h5>
          ------------------------------ `;
  });
  HTML += `
  <h6>© Diego Dimitroff Petcoff 2022 Nerver Stop</h6>`;

  return HTML;
}

module.exports = {
  sendEmail,
  renderMsj,
  renderMsjAdministrator,
  renderMsjSmsWap,
  renderMsjWapAdministrator,
};
