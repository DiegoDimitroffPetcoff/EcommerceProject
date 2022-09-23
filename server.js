const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const express = require("express");
const app = express();

const multer = require("multer");
const handlebars = require("express-handlebars");

// -----------------------------------------------------//
const httpServer = require("http").Server(app);
const io = require("socket.io")(httpServer);
// const httpServer = new HttpServer(app);
// const io = new IOServer(httpServer);
// const log4js = require("log4js");
// -----------------------------------------------------//

const routes = require("./routes/routes");

const PORT = process.env.PORT || 8080;
const MODO = process.argv[2] || "fork";

// TEMPLATE ENGINE---------------------------------------
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
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
app.set("view engine", "hbs");
app.set("views", "./views");

// ROUTES CONNECTION-------------------------------------
const Route = new routes();
app.use(Route.start());
require('./routes/socketIo')(io);

// INICIALIZATION SERVER- MOOD FORK OR CLUSTER-----------

if (MODO == "fork") {
  const SERVER = httpServer.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
  });
  SERVER.on("Error", (error) => console.log("error en servidor ${error}"));
} else {
  console.log("MODO= cluster");
  if (cluster.isMaster) {
    for (let index = 0; index < numCPUs; index++) {
      cluster.fork();
      console.log(`Server Master on ${PORT}`);
    }

    cluster.on("exit", (worker) => {});
  } else {
    const SERVER = httpServer.listen(PORT, () => {
      console.log(`Server Cluster on ${PORT}`);
    });
    SERVER.on("Error", (error) => console.log("error en servidor ${error}"));
  }
}


module.exports = app

// const ChatContainer = require("./src/daos/file/chatContainer");
// const ProductosContainer = require("./src/daos/file/productosContainer");
// const productos = new ProductosContainer();
// const chatContainer = new ChatContainer();


    // PRODUCTOS - --------------------------------
    // let compression = null;

    // io.on("connection", (socket) => {
    //   try {
    //     let prueba = productos.read();
    //     socket.emit("messages", prueba);
    //     socket.on("new-message", (data1) => {
    //       productos.save(data1);
    //       prueba.push(data1);

    //       io.sockets.emit("messages", prueba);
    //     });
    //   } catch (error) {
    //     let logger = log4js.getLogger("errorConsole");
    //     logger.error("PROBANDO EL LOG DE ERROR");
    //   }
    // });

    // // CHAT- ---------------------------------
    // io.on("connection", (socket) => {
    //   try {
    //     const chat = chatContainer.read();
    //     const dataContainer = { id: 1, posts: [] };
    //     dataContainer.posts = chat;
    //     const chatNormalizado = normalization(dataContainer);

    //     socket.emit("chat", chatNormalizado);

    //     socket.on("newChat", (data) => {
    //       data.author.avatar = "avatar";
    //       chatContainer.save(data);
    //       // CHAT: TODO EL HISTORIAL. DATA: NUEVO POST GUARDADO
    //       chat.push(data);
    //       // DATACONTAINER: SE LE DA EL FORMATO PARA QUE SEA NORMALIZADO
    //       dataContainer.posts = chat;
    //       let dataNocomprimida = JSON.stringify(dataContainer).length;
    //       let dataNormalized = normalization(dataContainer);
    //       let dataComprimida = JSON.stringify(dataNormalized).length;
    //       compression = compressionRatio(dataNocomprimida, dataComprimida);
    //     });

    //     try {
    //       socket.emit("compression", compression);
    //     } catch (error) {
    //       let logger = log4js.getLogger("error");

    //       logger.error("Error: En la Compresion del Chat");
    //       console.log(error);
    //     }
    //   } catch (error) {
    //     let logger = log4js.getLogger("error");

    //     logger.error("Error: Hubo un error en la ruta del Chat");
    //     console.log(error);
    //   }
    // });