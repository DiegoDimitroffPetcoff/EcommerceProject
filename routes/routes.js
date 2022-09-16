const express = require("express");
const route = express();
const routes = require("../utils/controler");

// ----------------------------------------------------------------------------------
const { TIEMPO_EXPIRACION } = require("../src/config/globals");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
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
// --------------------------------------------------------------------------------------------
const handlebars = require("express-handlebars");
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials/",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);



// ---------------------------------------------------------------------------------------------



class Routes {
  constructor() {}
  start() {
    // INDEX--------------------------------
    route.get("/", routes.getRoot);

    // LOGIN--------------------------------
    route.get("/login", routes.getLogin);
    route.post(
      "/login",
      passport.authenticate("login", { failureRedirect: "/failLogin" }),
      routes.postLogin
    );
    route.get("/failLogin", routes.getFaillogin);

    // SIGNUP--------------------------------
    route.get("/signUp", routes.getSignup);
    route.post(
      "/signUp",
      passport.authenticate("signup", { failureRedirect: "/failSingup" }),
      routes.postSignup
    );
    route.get("failSingup", routes.getFailsignup);

    // LOGOUT--------------------------------
    route.get("/logout", routes.getLogout);
    return route;
  }
}

module.exports = Routes;
