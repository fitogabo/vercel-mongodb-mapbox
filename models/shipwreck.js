// models/Shipwreck.js
import mongoose from 'mongoose';

const ShipwreckSchema = new mongoose.Schema({
    recrd: String,
    vesslterms: String,
    feature_type: String,
    chart: String,
    latdec: { type: Number },
    londec: { type: Number },
    gp_quality: String,
    depth: String,
    sounding_type: String,
    history: String,
    quasou: String,
    watlev: String,
    coordinates: {
        type: [Number],
    }
}, { collection: 'shipwrecks' });

export default mongoose.models.Shipwreck || mongoose.model('Shipwreck', ShipwreckSchema);