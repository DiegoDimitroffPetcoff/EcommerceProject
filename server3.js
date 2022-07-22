const cluster = require("cluster");

const { app, ramdom } = require("./app");

const numCPUs = require("os").cpus().length;

const { SERVER, route } = require("./routes/productRoute");

const PORT = parseInt(process.argv[2]) || 8080;

if (cluster.isMaster) {
  for (let index = 0; index < numCPUs; index++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {});
} else {
  ramdom.listen(8081, () => {
    console.log(`Server to RAMDOM on ${8081}`);
  });

  SERVER.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
  });
  SERVER.on("Error", (error) => console.log("error en servidor ${error}"));
}
