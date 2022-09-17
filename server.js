const cluster = require("cluster");
// const { fork } = require("child_process");
// const { app } = require("./app");
const numCPUs = require("os").cpus().length;


// const dotenv = require("dotenv");
// const { appendFile } = require("fs/promises");

const express = require("express");
const app = express();

const multer = require("multer");
const handlebars = require("express-handlebars");

const { Server: HttpServer } = require("http");
const httpServer = new HttpServer(app);

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
