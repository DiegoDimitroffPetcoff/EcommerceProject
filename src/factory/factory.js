const mongoose = require("mongoose");
const { TaskChannelList } = require("twilio/lib/rest/taskrouter/v1/workspace/taskChannel");

const configs = require("../config/globals");

let instance = null;

class Factory {
  constructor() {}
  static getInstance(data) {
    if (!instance) {
      instance = new Factory();
      if (data == "mongo" || data == "file") {
        console.log(`Base de datos utilizada: ${data}`);
      }
    }
    return instance;
  }
  connection(data) {
    if (data == "file") {
    mongoose.connect(configs.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });


    } else if (data == "mongo") {

      
      mongoose.connect(configs.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } else {
      console.log("Error en conexion de base de datos");
    }
  }


  
}

module.exports = Factory;