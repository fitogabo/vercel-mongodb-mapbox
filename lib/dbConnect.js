// lib/dbConnect.js
import mongoose from 'mongoose';

const connection = {};

const clientOptions = {
    serverApi: { version: '1', strict: true, deprecationErrors: true },
};

async function dbConnect(req, res) {
    console.log('dbConnect se está ejecutando...');

    if (mongoose.connection.readyState >= 1) {
        console.log("Ya estás conectado a MongoDB.");
        return;
    }

    try {
        console.log("Intentando conectar a MongoDB...");
        // Especifica la base de datos en la cadena de conexión
        await mongoose.connect(`${process.env.MONGODB_URI}/sample_geospatial`, clientOptions);
        mongoose.connection.on('connected', () => {
            console.log("¡Pinged tu despliegue. Te has conectado satisfactoriamente a MongoDB!");
            connection.isConnected = mongoose.connection.readyState;
        });
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        if (res) {
            res.status(500).json({ status: 'error' });
        }
        throw new Error('Error al conectar a MongoDB');
    }
}

export default dbConnect;