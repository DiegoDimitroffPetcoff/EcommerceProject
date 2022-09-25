const mongoose = require("mongoose");

const chatCollection = "chat";

const chatSchema = new mongoose.Schema({
  author: { type: Object },
});

module.exports = mongoose.model(chatCollection, chatSchema);
