const mongoose = require("mongoose");

const carritoCollection = "carritos";

const CarritoSchema = new mongoose.Schema({
  title: { type: String },
  price: { type: Number },

  id: { type: Number },
});

module.exports = mongoose.model(carritoCollection, CarritoSchema);
