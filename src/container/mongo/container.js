class Contenedor {
  constructor(Schema) {
    this.Schema = Schema;
  }

  idLector() {
    let objects = this.read();
    let id = null;
    objects.forEach((element) => {
      id = element.id;
    });
    return id;
  }

  async read() {
    try {
      // let toRead = await this.Schema.find({});
      // console.log (toRead)
      return await this.Schema.find({},{_id:0});
    } catch (error) {
      console.log(error);
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

  getById(x) {
    let array = [];
    let y = x;
    try {
      let data = fs.readFileSync(this.route, "utf-8");
      array = JSON.parse(data);
    } catch {
      console.log("catch error");
    }
    let object = null;

    array.forEach((element) => {
      if (element.id == y) {
        object = element;
      }
    });
    return object;
  }
}

module.exports = Contenedor;
