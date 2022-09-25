function activa(x, DBSChosen){
    if(DBSChosen == "mongo"){
      console.log("SOCKET CON MONGO");
    
    require("./routes/socketIoMonfgo")(x);
    }else{
      console.log("file");
      console.log("SOCKET CON FILESISTEMN");
      require("./routes/socketIo")(x);
    }}

module.exports = activa