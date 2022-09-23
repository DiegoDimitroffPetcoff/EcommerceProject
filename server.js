const express = require("express");
const app = express();
const multer = require("multer");
// -----------------------------------------------------//
const httpServer = require("http").Server(app);
const io = require("socket.io")(httpServer);
// -----------------------------------------------------//


// TEMPLATE ENGINE--------------------------------------//
const handlebars = require("express-handlebars");
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

// PORT--------------------------------------------------//
const configs = require("./src/config/globals");
const PORT = configs.PORT
const MODO = process.argv[3] || "fork";

// DATA BASE CONNECTION----------------------------------//
const Factory = require("./src/factory/factory");
const DBSChosen = process.argv[2] || "mongo";
const DBS = Factory.getInstance(DBSChosen);
DBS.connection(DBSChosen);

// ROUTES CONNECTION-------------------------------------//
const routes = require("./routes/routes");
const Route = new routes();
app.use(Route.start());
require("./routes/socketIo")(io);

// INICIALIZATION SERVER- MOOD FORK OR CLUSTER-----------//
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
if (MODO == "fork") {
  console.log(" MODO = Fork");
  const SERVER = httpServer.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
  });
  SERVER.on("Error", (error) => console.log("error en servidor ${error}"));
} else {
  console.log(" MODO = Cluster");
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

module.exports = app;
