// const fs = require("fs");
// const express = require("express");
// const app = express();
// const { Router } = express
// const carritoRouter = Router()
// app.use(express.static("public"));
// app.use("/static", express.static(__dirname + "/public"));

// const { ContenedorArchivo } = require("../../contenedores/contenedorArchivos");
const fs = require("fs");
const Contenedor = require("../../container/file/container");

class CarritoDaosArchivos extends Contenedor {
  constructor() {
    super("./cartStorage.txt");
  }
  saveCarrito(x) {
    let array = [];
    let object = x;

    try {
      let data = fs.readFileSync("./cartStorage.txt", "utf-8");
      
      array = JSON.parse(data);
    } catch {
      console.log("catch error");
    }
    object.id = array.length + 1;
    // object.timestamp = new Date();
    object.Timestamp = new Date();
    object.Timestamp += object.Timestamp.getTime();
    array.push(object);

    let lastId = array.length + 1; 
    fs.writeFileSync(this.route, JSON.stringify(array, null, "\t"));
    this.id = lastId++;
    return object;
  }
}


module.exports = CarritoDaosArchivos;