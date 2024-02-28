// lib/dbMiddleware.js
import dbConnect from './dbConnect';

const dbMiddleware = handler => async (req, res) => {
    try {
        console.log('Connecting to database...');
        await dbConnect();
        console.log('Successfully connected to database');
    } catch (error) {
        console.error('Error connecting to database:', error.message);
        return res.status(500).json({ success: false, message: 'Error connecting to database', error: error.message });
    }

    return handler(req, res);
};

export default dbMiddleware;