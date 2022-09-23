const ProductosContainer = require("../../src/daos/file/productosContainer");

const CarritoDaosArchivos = require("../../src/daos/file/carritoContainer");

class ApiService {
  constructor() {
    this.productos = new ProductosContainer();
    this.carrito = new CarritoDaosArchivos();
  }

  getFilter(data) {
    return this.productos.getById(data);
  }

  postFilter(data) {
    return this.carrito.saveCarrito(data);
  }
  tuCarrito(){
    return this.carrito.read();
  }
  test(data){
    return this.productos.mocks(data)

  }
}
module.exports = ApiService;
