const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const route = express();

const SERVER = new HttpServer(route);
const io = new IOServer(SERVER);

const session = require("express-session");
const log4js = require("log4js");

// const MongoStore = require("connect-mongo");
const ramdomsChild = require("../utils/ramdomsChild");
const { fork } = require("child_process");
// const compressionModule = require('compression');
const faker = require("faker");
faker.locale = "es";

const ChatContainer = require("../src/daos/file/chatContainer");
const ProductosContainer = require("../src/daos/file/productosContainer");
const productos = new ProductosContainer();
const chatContainer = new ChatContainer();

// const util = require("util");
// const { fakerCreate } = require("../utils/mocks");
// const { normalization } = require("../utils/normalizr");

const info = require("../utils/info");

const compressionRatio = require("../utils/calculator");
// const userLogged = require("../utils/sessions");

const fs = require("fs");
// const { response } = require("express");

route.use(express.json());
route.use(express.urlencoded({ extended: true }));
route.use(express.static("./public"));

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// const routes = require("../utils/controler");
const UserModel = require("../src/models/usuarios.js");
const validatePass = require("../utils/passValidatos");
const createHash = require("../utils/hashGenerator");
const { TIEMPO_EXPIRACION } = require("../src/config/globals");

route.use(
  session({
    secret: "diego",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: parseInt(TIEMPO_EXPIRACION),
    },
    rolling: true,
    resave: true,
    saveUninitialized: true,
  })
);

route.use(passport.initialize());
route.use(passport.session());

route.set("views", "./views");

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    UserModel.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        console.log("User not finded");
        return done(null, false);
      }
      if (!validatePass(user, password)) {
        console.log("password or user invalid");
        return done(null, false);
      }

      return done(null, user);
    });
  })
);
const avatar = faker.image.avatar();

passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      UserModel.findOne({ username: username }, (err, user) => {
        if (err) {
          console.log(`some issue happened: ${err}`);
          return done(err);
        }
        if (user) {
          console.log(`This User already exist. Try with some other `);
          return done(null, false);
        }

        const newUser = {
          firstName: req.body.lastName,
          lastName: req.body.firstName,
          age: req.body.age,
          adress: req.body.adress,
          phonenumber: req.body.phonenumber,
          email: req.body.email,
          avatar: avatar,
          username: username,
          password: createHash(password),
        };

        // console.log(`NewUser:
        //     ${newUser}`);

        UserModel.create(newUser, (err, userWithId) => {
          if (err) {
            console.log(`some issue happened: ${err}`);
            return done(err);
          }
          let HTML = `Se registro un nuevo usuario: 
          <h1>Nombre: ${userWithId.lastName} </h1><br> 
          <h1>Username: ${userWithId.username}</h1>   <br> 
          <h2>Apellido: ${userWithId.firstName} <br>
          Direccion: ${userWithId.adress}<br>
          Edad: ${userWithId.age} <br>
          Numero de Celular: ${userWithId.phonenumber} <br>
          E mail: ${userWithId.email}</h2>`;

          const mailOptions = {
            from: "Envio este correo desde mi App",
            to: TEST_MAIL,
            subject: "Nuevo Registro!",
            html: HTML,
          };
          sendEmail(userWithId, mailOptions);
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});
passport.deserializeUser((id, callback) => {
  UserModel.findById(id, callback);
});
const Controler = require("../utils/controler.js");

log4js.configure({
  appenders: {
    Console: { type: "console" },
    // errorFile: { type: "file", filename:'loggerError.log' },
    warnFile: { type: "file", filename: "warn.log" },
    errorFile: { type: "file", filename: "error.log" },
  },
  categories: {
    default: { appenders: ["warnFile", "Console"], level: "warn" },
    info: { appenders: ["Console"], level: "info" },
    error: { appenders: ["errorFile", "Console"], level: "error" },
  },
});

class Routes {
  constructor() {
    this.controller = new Controler();
  }
  start() {
    // INDEX--------------------------------
    route.get("/", this.controller.getRoot);

    // LOGIN--------------------------------
    route.get("/login", this.controller.getLogin);
    route.post(
      "/login",
      passport.authenticate("login", { failureRedirect: "/failLogin" }),
      this.controller.postLogin
    );
    route.get("/failLogin", this.controller.getFaillogin);

    // SIGNUP--------------------------------
    route.get("/signUp", this.controller.getSignup);
    route.post(
      "/signUp",
      passport.authenticate("signup", { failureRedirect: "/failSingup" }),
      this.controller.postSignup
    );
    route.get("failSingup", this.controller.getFailsignup);

    // LOGOUT--------------------------------
    route.get("/logout", this.controller.getLogout);

    route.get("/productos", this.controller.postLogin, (req, res) => {
      res.render("main");
    });
    route.post("/productos", this.controller.postLogin, (req, res) => {
      res.render("main", { isUser: true });
    });

    // FITER--------------------------------

    route.get("/filter", this.controller.getFilter);

    route.post("/filter", this.controller.postFilter);
    // const carrito = new CarritoDaosArchivos();

    route.get("/tucarrito", this.controller.tucarrito);

    route.get("/tuCompra", this.controller.tuCompra);

    route.get("/carrito", this.controller.carrito);

    route.get("/chat", this.controller.chatLogin);

    route.get("/test/:num", this.controller.test);
   
    route.get("/info", info);

    route.get("/api/randoms", (req, res) => {
      try {
        let num = null;
        if (req.query.cant == undefined) {
          num = 100000000;
        } else {
          num = req.query.cant;
        }
        const child = fork("utils/ramdomsChild.js");
        child.send(num);
        child.on("message", (data) => {
          try {
            let mensaje = `Se han calculado en total, ${num} numeros:`;
            let result = JSON.parse(data);
            res.render("calculator", { mensaje, result });
          } catch (error) {
            console.log("ERROR");
            console.log(error);
          }
        });
      } catch (error) {
        let logger = log4js.getLogger("errorConsole");

        logger.error("Log Error");
        console.log(error);
      }
    });

    // FAIL ROUTE--------------------------------
    route.get("*", (req, res) => {
      res.status(404).render("error", {});
    });

    return route;
  }
}

module.exports = Routes;
