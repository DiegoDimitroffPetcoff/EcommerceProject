const ProductosContainer = require("../../src/daos/file/productosContainer");
// const productos = new ProductosContainer();

const CarritoDaosArchivos = require("../../src/daos/file/carritoContainer");
const carrito = new CarritoDaosArchivos();

class ApiService {
  constructor() {
    this.productos = new ProductosContainer();
  }

  getFilter(data) {
    return this.productos.getById(data);
  }

  async postFilter(data) {
    try {
      carrito.saveCarrito(getFilter(data));
      let filter = productFiltered;
      console.log(productFiltered);
      let user = req.user;
      res.render("postcarrito", {
        Producto: productos.getById(req.params.num),
        filter,
        user: user,
        isUser: true,
      });
    } catch (error) {
      const msj = "No agregaste ningun producto";
      console.log("ENTRO EL CATCH");
      res.render("carrito", {
        Producto: productos.getById(req.params.num),
        msj,
      });
    }
  }
}
module.exports = ApiService;

// getFilter(req, res) {
//   if (req.isAuthenticated()) {
//     let filter = api.getFilter(req);
//     productFiltered = api.getFilter(req);

//     let user = req.user;
//     res.render("carrito", {
//       Producto: productos.getById(req.params.num),
//       filter,
//       user: user,
//       isUser: true,
//     });
//   } else {
//     let logger = log4js.getLogger("error");
//     logger.error("Hubo un error en el Logeo");
//     res.redirect("login");
//   }
// }
