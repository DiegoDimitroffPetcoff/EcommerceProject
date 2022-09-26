const log4js = require("log4js");

// ---------------------------------PARA MONGO ---------------------------------//
const ChatContainer = require("../src/daos/mongodb/chatContainer");
const ProductosContainer = require("../src/daos/mongodb/productosContainer");
const productos = new ProductosContainer();
const chatContainer = new ChatContainer();
// const { normalization } = require("../utils/normalizrMongo");
const compressionRatio = require("../utils/calculator");

// PRODUCTOS - --------------------------------
let compression = null;

module.exports = function (io) {
  io.on("connection", async (socket) => {
    try {
      let prueba = await productos.read();
      socket.emit("messages", prueba);
      socket.on("new-message", (data1) => {
        productos.save(data1);
        prueba.push(data1);

        io.sockets.emit("messages", prueba);

      });
      socket.on ('delete',async (data)=>{
      
        let dataDeleted = await productos.getById(data)
        let objDelete = await productos.Delete(await productos.getById(data));
        io.sockets.emit("messagesDelete",(dataDeleted) );   
        
      })

      socket.on ('edit',async (data)=>{
      
        let dataEdited = await productos.getById(data)
        let objEdited = await productos.Update(dataEdited.id);
        io.sockets.emit("messagesEdited",(dataEdited) );   
        
      })



    } catch (error) {
      let logger = log4js.getLogger("errorConsole");
      logger.error("PROBANDO EL LOG DE ERROR");
    }
  });

  // // CHAT- ---------------------------------

  io.on("connection", async (socket) => {
    try {
      const chat = await chatContainer.read();

      const dataContainer = { id: 1, posts: [] };
      dataContainer.posts = chat;

      socket.emit("chatMongo", dataContainer);

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
