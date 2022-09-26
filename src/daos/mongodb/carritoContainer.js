const Contenedor = require("../../container/mongo/container");
const Schema = require("../../models/carrito.js");

class CarritoDaosArchivos extends Contenedor {
  constructor() {
    super(Schema);
    this.Schema = Schema;
  }

  async saveCarrito(content) {
    let obj = { title: content.title, price: content.price, id: content.id };
    try {
      let createModel = new this.Schema(obj);
      return await createModel.save();
    } catch (err) {
      console.log("EL ERROR ES");
      console.log(err);
    }
  }
}

module.exports = CarritoDaosArchivos;
