const fs = require("fs");
const Contenedor = require("../../container/file/container");

class ChatContainer extends Contenedor {
  constructor() {
    super("./chat.txt");
  }
}

module.exports = ChatContainer;
