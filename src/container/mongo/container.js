class Contenedor {
  constructor(Schema) {
    this.Schema = Schema;
  }

  async save(content) {
    let obj = { title: content.title, price: content.price, id: content.id };
    console.log(obj);
    let createModel = new this.Schema(obj);
    return await createModel.save();
  }

  async read() {
    try {
      return await this.Schema.find({}, { _id: 0 });
    } catch (error) {
      console.log(error);
    }
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

  async Delete(element) {
    return await this.Schema.deleteOne(element);
  }

  async Update(object, id) {
    return await this.Schema.updateOne(
      {
        id: id,
      },
      { $set: { title: object.title, price: object.price } }
    );
  }
}

module.exports = Contenedor;
