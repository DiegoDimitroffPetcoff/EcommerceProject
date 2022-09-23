require('dotenv').config()

module.exports ={
    MONGO_URI: process.env.MONGO_URI ||'',
    TIEMPO_EXPIRACION: process.env.TIEMPO_EXPIRACION|| 60000,
    PORT: process.env.PORT ||8080

}