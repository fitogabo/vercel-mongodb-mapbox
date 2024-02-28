// pages/api/getMarkers.js
import dbConnect from '../../lib/dbConnect';
import Shipwreck from '../../models/shipwreck';

const getMarkers = async (req, res) => {
    console.log('Handling request to /api/getMarkers');

    try {
        console.log('Connecting to database...');
        await dbConnect();
        console.log('Successfully connected to database');
    } catch (error) {
        console.error('Error connecting to database:', error.message);
        return res.status(500).json({ success: false, message: 'Error connecting to database', error: error.message });
    }

    try {
        console.log('Fetching shipwrecks...');
        const shipwrecks = await Shipwreck.find({}) || [];
        console.log(`Fetched ${shipwrecks.length} shipwrecks`);

        res.status(200).json({ success: true, data: shipwrecks });
    } catch (error) {
        console.error('Error fetching shipwrecks:', error.message);
        res.status(500).json({ success: false, message: 'Error fetching shipwrecks', error: error.message });
    }
};

export default getMarkers;