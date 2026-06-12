const mongoose = require('mongoose')
const conectarDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("conexion exitosa con mongodb")
    } catch (error) {
        console.error("error al conectar a mongodb", error.message)
    }
}

module.exports = conectarDb