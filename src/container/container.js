const fs = require("fs");

class Contenedor {
  constructor(fileName) {
    this.route = fileName;
  }

  idLector() {
    let objects = this.read();
    let id = null;
    objects.forEach((element) => {
      id = element.id;
    });
    return id;
  }

  read() {
    try {
      let readFinal = fs.readFileSync(this.route, "utf-8");
      let allProducts = JSON.parse(readFinal);
      return allProducts;
    } catch (error) {
      console.log(`Error en la lectura del archivo: ${error}`);
    }
  }

  save(content) {
    try {
      let array = [];
      array = this.read(this.route);
      content.id = this.idLector() + 1;
      array.push(content);
      fs.writeFileSync(this.route, JSON.stringify(array, null, "\t"));
    } catch (error) {
      console.log(`Error al intentar guardar el archivo: ${error}`);
    }
  }
}

module.exports = Contenedor;
