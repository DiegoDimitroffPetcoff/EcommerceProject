const fs = require("fs");
const Contenedor = require("../../container/mongo/container");
const {MockProduct} = require("../../../utils/mocks");


class ProductosContainer extends Contenedor {
  constructor() {
    super("./productos.txt");
  }

  mocks(amount) {
    let mocksList = [];
    for (let index = 0; index < amount; index++) {
      let object = MockProduct()
      mocksList.push(object);
      console.log(object)
      this.save(object)
    }    
    return mocksList;
  }
}

module.exports = ProductosContainer;
