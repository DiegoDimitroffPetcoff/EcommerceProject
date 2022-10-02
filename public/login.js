const express = require("express");
const {data} = require('../routes/routes')
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



module.exports = {renderName, logOut}

