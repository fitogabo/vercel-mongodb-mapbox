// pages/api/getMarkers.js
import dbConnect from '../../app/lib/dbConnect';
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

    let shipwrecks;
    try {
        console.log('Fetching shipwrecks...');
        shipwrecks = await Shipwreck.find({}) || [];
        console.log(`Fetched ${shipwrecks.length} shipwrecks`);
    } catch (error) {
        console.error('Error fetching shipwrecks:', error.message);
        return res.status(500).json({ success: false, message: 'Error fetching shipwrecks', error: error.message });
    }

    // Get the total count of documents
    let count;
    try {
        console.log('Counting documents...');
        count = await Shipwreck.countDocuments({});
        console.log(`Total documents in database: ${count}`);
    } catch (error) {
        console.error('Error counting documents:', error.message);
        return res.status(500).json({ success: false, message: 'Error counting documents', error: error.message });
    }

    // Transforma los datos de MongoDB a GeoJSON
    const geojson = {
        type: 'FeatureCollection',
        features: shipwrecks.map(shipwreck => ({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [
                    parseFloat(shipwreck.londec.$numberDouble),
                    parseFloat(shipwreck.latdec.$numberDouble)
                ]
            },
            properties: {
                // Aquí puedes agregar cualquier otra propiedad que quieras mostrar en el mapa
                name: shipwreck.vesslterms,
                feature_type: shipwreck.feature_type
            }
        }))
    };

    res.status(200).json({ success: true, data: geojson });
};

export default getMarkers;          