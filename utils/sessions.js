const express = require("express");

function userLogged(req, res, next) {
  
  if (req.session?.logged == true) {
    console.log("LOGEADO");
    return next();
  }else{console.log("NO ESTA LOGEADO");
res.render('login')}
}



module.exports = userLogged
