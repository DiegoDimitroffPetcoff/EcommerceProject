const Contenedor = require("../../container/mongo/container");
const Schema = require('../../models/chat')

class ChatContainer extends Contenedor {
  constructor() {
    super(Schema);
    this.model = Schema;
  }
}

module.exports = ChatContainer;
