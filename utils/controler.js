const log4js = require("log4js");

const ApiService = require("../src/service/service.File");
const api = new ApiService();

const Api = require("twilio/lib/rest/Api");

const {
  sendEmail,
  renderMsj,
  renderMsjAdministrator,
  renderMsjSmsWap,
  renderMsjWapAdministrator,
} = require("../utils/mailSignup");
const { sendSms, sendWap, sendWapAdministrator } = require("../utils/msj");

const TEST_MAIL = process.env.TEST_MAIL || "diegodimitroffpetcoff@gmail.com";

let productFiltered = "FILTRO VACIO";

class Controllers {
  constructor() {}

  // ROOT---------------------------
  getRoot(req, res) {
    const logger = log4js.getLogger("info");
    logger.info("Peticion recibida en la ruta /root");
    res.render("root");
  }

  // LOGIN---------------------------
  getLogin(req, res) {
    const logger = log4js.getLogger("info");
    logger.info("Peticion recibida en la ruta /getLogin");
    res.render("login");
  }

  postLogin(req, res) {
    if (req.isAuthenticated()) {
      const logger = log4js.getLogger("info");
      logger.info(
        "Peticion recibida en la ruta /login. Usuario Correctamente Logeado"
      );
      let user = req.user;
      res.render("main", { user: user, isUser: true });
    } else {
      let logger = log4js.getLogger("error");
      logger.error("Hubo un error en el Logeo");
      res.redirect("login");
    }
  }

  chatLogin(req, res) {
    if (req.isAuthenticated()) {
      const logger = log4js.getLogger("info");
      logger.info("Peticion recibida en la ruta /chat");
      let user = req.user;
      res.render("about", { user: user, isUser: true });
    } else {
      let logger = log4js.getLogger("error");
      logger.error("Hubo un error en el Logeo");
      res.redirect("login");
    }
  }

  getFaillogin(req, res) {
    let logger = log4js.getLogger("error");
    logger.error("Hubo un error en el Logeo");
    console.log("error en login");
    res.render("failLogin", {});
  }

  // SIGN UP---------------------------
  getSignup(req, res) {
    const logger = log4js.getLogger("info");
    logger.info(
      "Peticion recibida en la ruta /signup. Usuario Creado Correctamente"
    );
    res.render("signup");
  }
  postSignup(req, res) {
    if (req.isAuthenticated()) {
      const logger = log4js.getLogger("info");
      logger.info(
        "Peticion recibida en la ruta /signup. Usuario Creado Correctamente"
      );
      let user = req.user;
      let isUser = true;
      res.render("profile", { user, isUser });
    } else {
      let logger = log4js.getLogger("error");
      logger.error("Hubo un error en el Sign up");
      res.redirect("login");
    }
  }
  getFailsignup(req, res) {
    res.render("failSignup", {});
  }

  // FILTER---------------------------
  getFilter(req, res) {
    if (req.isAuthenticated()) {
      productFiltered = api.getFilter(req.query.id);
      res.render("carrito", {
        Producto: api.getFilter(req.params.num),
        filter: productFiltered,
        user: req.user,
        isUser: true,
      });
    } else {
      let logger = log4js.getLogger("error");
      logger.error("Hubo un error en el Logeo");
      res.redirect("login");
    }
  }

  postFilter(req, res) {
    try {
      api.postFilter(productFiltered);

      res.render("postcarrito", {
        Producto: api.getFilter(req.params.num),
        filter: productFiltered,
        user: req.user,
        isUser: true,
      });
    } catch (error) {
      const msj = "No agregaste ningun producto";
      console.log("ENTRO EL CATCH");
      res.render("carrito", {
        Producto: api.getFilter(req.params.num),
        msj,
      });
    }
  }

  tucarrito(req, res) {
    if (req.isAuthenticated()) {
      res.render("tuCarrito", {
        Productos: api.tuCarrito(),
        user: req.user,
        isUser: true,
      });
    } else {
      let logger = log4js.getLogger("error");
      logger.error("Hubo un error en el Logeo");
      res.redirect("login");
    }
  }

  // LOG OUT---------------------------
  getLogout(req, res) {
    const logger = log4js.getLogger("info");
    logger.info(
      "Peticion recibida en la ruta /getLogout. Usuario Deslogeado Correctamente"
    );
    req.logout((err) => {
      if (!err) {
        res.render("logout");
      }
    });
  }

  tuCompra(req, res) {
    if (req.isAuthenticated()) {
      let Productos = api.tuCarrito();
      let phoneUser = req.user.phonenumber;
      let HTML = renderMsj(Productos, req.user.lastName);
      let HTMLSMSWAP = renderMsjSmsWap(Productos, req.user.lastName);
      let HTMLSMSWAPADM = renderMsjWapAdministrator(
        Productos,
        req.user.lastName
      );
      let HTMLadministrator = renderMsjAdministrator(Productos, req.user);
      let mailOptions = {
        from: "Envio este correo desde mi App",

        // -----MODO PRUEBA: TEST_MAIL--------//
        // to: req.user.email,
        to: TEST_MAIL,
        // ----------------------------------//

        subject: `${req.user.lastName} muchas gracias por tu compra!`,
        html: HTML,
      };
      let mailOptionsAdministrator = {
        from: "Correo de control para el administrador",
        to: TEST_MAIL,
        subject: `${req.user.lastName} ${req.user.firstName} Ah realizado una compra`,
        html: HTMLadministrator,
      };
      sendEmail("Se envio e-mail", mailOptions);
      sendEmail("Se envio e-mail al administrador", mailOptionsAdministrator);
      sendWap(HTMLSMSWAP, phoneUser);
      sendWapAdministrator(HTMLSMSWAPADM);
      sendSms(HTMLSMSWAP, phoneUser);

      res.render("tuCompra", {
        Productos: api.tuCarrito(),
        email: req.user.email,
        nombre: req.user.lastName,
        phoneUser,
      });
    } else {
      let logger = log4js.getLogger("error");
      logger.error("Hubo un error en el Logeo");
      res.redirect("login");
    }
  }

  carrito(req, res) {
    res.json({ Productos: api.tuCarrito() });
  };

  test(req, res)  {
    try {
      res.json(api.test(req.params.num));
    } catch (err) {
      console.log(err);
    }
  }

  
}

// CHILD CONTROLER---------------------------
// function randomsControler(req, res)  {
//   let num = null;
//   if (req.query.cant == undefined) {
//     num = 100000;
//   } else {
//     num = req.query.cant;
//   }
//   const child = fork("utils/ramdomsChild.js");
//   child.send(num);
//   child.on("message", (data) => {
//     try {
//       let mensaje = `Se han calculado ${num} de numeros:`;
//       let result = JSON.parse(data);
//       res.json({ mensaje, result });
//     } catch (error) {
//       console.log("ERROR");
//       console.log(error);
//     }
//   });
// }

module.exports = Controllers;
