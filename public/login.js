const express = require("express");
const {data} = require('../routes/productRoute')
console.log(data);
function renderName(params) {
  let name = `<h1>Bienvenido ${params}</h1>
  <form onsubmit="logOut(this)">    
  <a href="./logout"><input type="button" value="Log Out"></a>
</form>`

  document.getElementById("filaTexto").innerHTML = name;
}

function logOut(params) {
  document.getElementById("filaTexto").innerHTML = "deslogeado"
}



// let username = null;
// socket.on("logeado", (data) => {
//   try {
//     let dataParse = JSON.parse(data);
//     renderName(dataParse.username);
//   } catch (error) {
//     console.log("ERROR - NO FUNCIONA");
//     console.log(error);
//   }
// });

module.exports = {renderName, logOut}

