const log4js = require("log4js");

// ROOT---------------------------
function getRoot(req, res) {
  const logger = log4js.getLogger("info");
  logger.info("Peticion recibida en la ruta /root");
  res.render("root");
}

// LOGIN---------------------------
function getLogin(req, res) {
  const logger = log4js.getLogger("info");
  logger.info("Peticion recibida en la ruta /getLogin");
  res.render("login");
}
function postLogin(req, res) {
  if (req.isAuthenticated()) {
    const logger = log4js.getLogger("info");
    logger.info("Peticion recibida en la ruta /login. Usuario Correctamente Logeado");
    // console.log(req.user);
    let user = req.user;
    res.render("main", { user: user, isUser: true });
  } else {
    let logger = log4js.getLogger("error");
    logger.error("Hubo un error en el Logeo");
    res.redirect("login");
  }
}
function chatLogin(req, res) {
  if (req.isAuthenticated()) {
    const logger = log4js.getLogger("info");
    logger.info("Peticion recibida en la ruta /chat");
    console.log(req.user);
    let user = req.user;
    res.render("about", { user: user, isUser: true });
  } else {
    let logger = log4js.getLogger("error");
    logger.error("Hubo un error en el Logeo");
    res.redirect("login");
  }
}

function getFaillogin(req, res) {
  let logger = log4js.getLogger("error");
  logger.error("Hubo un error en el Logeo");
  console.log("error en login");
  res.render("failLogin", {});
}

// SIGN UP---------------------------
function getSignup(req, res) {
  const logger = log4js.getLogger("info");
  logger.info("Peticion recibida en la ruta /signup. Usuario Creado Correctamente");
  res.render("signup");
}
function postSignup(req, res) {
  if (req.isAuthenticated()) {
    const logger = log4js.getLogger("info");
    logger.info("Peticion recibida en la ruta /signup. Usuario Creado Correctamente");
    let user = req.user;
    let isUser = true;
    res.render("profile", { user, isUser });
  } else {
    let logger = log4js.getLogger("error");
    logger.error("Hubo un error en el Sign up");
    res.redirect("login");
  }
}
function getFailsignup(req, res) {
  let logger = log4js.getLogger("error");
  logger.error("Hubo un error en el Sign up");
  console.log("error en login");
  res.render("failSignup", {});
}

// LOG OUT---------------------------
function getLogout(req, res) {
  const logger = log4js.getLogger("info");
  logger.info("Peticion recibida en la ruta /getLogout. Usuario Deslogeado Correctamente");
  req.logout((err) => {
    if (!err) {
      res.render("logout");
    }
  });
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

module.exports = {
  getRoot,
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  getFaillogin,
  getFailsignup,
  getLogout,
  chatLogin,
};
