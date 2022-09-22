const log4js = require("log4js");
const ProductosContainer = require("../src/daos/file/productosContainer");
const productos = new ProductosContainer();
const ApiService = require("../src/service/service.File");
const api = new ApiService();

const CarritoDaosArchivos = require("../src/daos/file/carritoContainer");
const carrito = new CarritoDaosArchivos();
const Api = require("twilio/lib/rest/Api");

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

  getFilter(req, res) {
    if (req.isAuthenticated()) {
      productFiltered = api.getFilter(req.query.id);
      res.render("carrito", {
        Producto: productos.getById(req.params.num),
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
      carrito.saveCarrito(productFiltered);

      res.render("postcarrito", {
        Producto: productos.getById(req.params.num),
        filter: productFiltered,
        user: req.user,
        isUser: true,
      });
    } catch (error) {
      const msj = "No agregaste ningun producto";
      console.log("ENTRO EL CATCH");
      res.render("carrito", {
        Producto: productos.getById(req.params.num),
        msj,
      });
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

// ATENCION!!! VER FILTER
// filter(req, res) {
//   // console.log( productos.getById(req.query.id))
//   let filter = productos.getById(req.query.id);
//   productFiltered = productos.getById(req.query.id);
//   res.render("carrito", {
//     Producto: productos.getById(req.params.num),
//     filter,
//   });
// }
