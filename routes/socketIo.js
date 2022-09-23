const log4js = require("log4js");
const { normalization } = require("../utils/normalizr");
const ChatContainer = require("../src/daos/file/chatContainer");
const ProductosContainer = require("../src/daos/file/productosContainer");
const productos = new ProductosContainer();
const chatContainer = new ChatContainer();

// PRODUCTOS - --------------------------------
let compression = null;

module.exports = function (io) {
  io.on("connection", (socket) => {
    try {
      let prueba = productos.read();
      socket.emit("messages", prueba);
      socket.on("new-message", (data1) => {
        productos.save(data1);
        prueba.push(data1);

        io.sockets.emit("messages", prueba);
      });
    } catch (error) {
      let logger = log4js.getLogger("errorConsole");
      logger.error("PROBANDO EL LOG DE ERROR");
    }
  });

  // // CHAT- ---------------------------------

  io.on("connection", (socket) => {
    try {
      const chat = chatContainer.read();
      const dataContainer = { id: 1, posts: [] };
      dataContainer.posts = chat;
      const chatNormalizado = normalization(dataContainer);

      socket.emit("chat", chatNormalizado);

      socket.on("newChat", (data) => {
        data.author.avatar = "avatar";
        chatContainer.save(data);
        // CHAT: TODO EL HISTORIAL. DATA: NUEVO POST GUARDADO
        chat.push(data);
        // DATACONTAINER: SE LE DA EL FORMATO PARA QUE SEA NORMALIZADO
        dataContainer.posts = chat;
        let dataNocomprimida = JSON.stringify(dataContainer).length;
        let dataNormalized = normalization(dataContainer);
        let dataComprimida = JSON.stringify(dataNormalized).length;
        compression = compressionRatio(dataNocomprimida, dataComprimida);
      });

      try {
        socket.emit("compression", compression);
      } catch (error) {
        let logger = log4js.getLogger("error");

        logger.error("Error: En la Compresion del Chat");
        console.log(error);
      }
    } catch (error) {
      let logger = log4js.getLogger("error");

      logger.error("Error: Hubo un error en la ruta del Chat");
      console.log(error);
    }
  });

};