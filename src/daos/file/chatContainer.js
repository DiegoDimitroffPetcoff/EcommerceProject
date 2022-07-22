const fs = require("fs");
const Contenedor = require("../../container/container");

class ChatContainer extends Contenedor {
  constructor() {
    super("./chat.txt");
  }
}

module.exports = ChatContainer;
