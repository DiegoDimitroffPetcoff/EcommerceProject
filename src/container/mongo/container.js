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
      return await this.Schema.find({}, { _id: 0 });
    } catch (error) {
      console.log(error);
    }
  }

  save(content) {

  }

  async getById(x) {
    try {
      let usuario = await this.Schema.find({ id: x }, { _id: 0 });
      return usuario[0];
    } catch (error) {
      console.log(error);
    }
    return object;
  }
}

module.exports = Contenedor;
