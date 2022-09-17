// const express = require("express");
// const app = express();
// const ramdom= express();
// const { fork } = require("child_process");


// const { SERVER, route } = require("./routes/productRoute");


// const multer = require("multer");
// const handlebars = require("express-handlebars");
// const dotenv = require("dotenv").config();


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.engine(
//   "hbs",
//   handlebars.engine({
//     extname: ".hbs",
//     defaultLayout: "index.hbs",
//     layoutsDir: __dirname + "/views/layouts",
//     partialsDir: __dirname + "/views/partials/",
//     runtimeOptions: {
//       allowProtoPropertiesByDefault: true,
//       allowProtoMethodsByDefault: true,
//     },
//   })
// );

// ramdom.set("view engine", "hbs");
// ramdom.set("views", "./views");

// ramdom.use(express.json());
// ramdom.use(express.urlencoded({ extended: true }));

// ramdom.engine(
//   "hbs",
//   handlebars.engine({
//     extname: ".hbs",
//     defaultLayout: "index.hbs",
//     layoutsDir: __dirname + "/views/layouts",
//     partialsDir: __dirname + "/views/partials/",
//     runtimeOptions: {
//       allowProtoPropertiesByDefault: true,
//       allowProtoMethodsByDefault: true,
//     },
//   })
// );

// app.set("view engine", "hbs");
// app.set("views", "./views");



// let storage = multer.diskStorage({
//   destination: function (req, res, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });
// process.on('message',msg=>{
//   app.use(route);
// })
// app.use(route);

// ramdom.get("/api/randoms", (req, res) => {
//   let num = null;
//   if (req.query.cant == undefined) {
//     num = 100000000;
//   } else {
//     num = req.query.cant;
//   }
//   const child = fork("./utils/ramdomsChild.js");
//   child.send(num);
//   child.on("message", (data) => {
//     try {
//       let mensaje = `Se han calculado en total, ${num} numeros:`;
//       let result = JSON.parse(data);
//       res.render("calculator", { mensaje, result });
//     } catch (error) {
//       console.log("ERROR");
//       console.log(error);
//     }
//   });
// });

// const upload = multer({ storage: storage });
// module.exports = {app, ramdom};
