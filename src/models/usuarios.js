// const { configs } = require('dotenv');
const mongoose = require('mongoose');
require('dotenv').config()
const configs = require('../config/globals')


console.log(configs.MONGO_URI);

mongoose.connect('mongodb+srv://diegodimii:Astronomico1@cluster0.99hplt2.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
} );

const usuariosCollection = 'users-ecommerces';

const UsuarioSchema = new mongoose.Schema({
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    adress: {type: String, required: true, max: 100},
    age: {type: String, required: true, max: 100},
    phonenumber: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100},
    avatar: {type: String, required: true, max: 100},
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100}
});

module.exports= mongoose.model(usuariosCollection, UsuarioSchema)