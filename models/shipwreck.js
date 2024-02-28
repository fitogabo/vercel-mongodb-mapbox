// models/shipwreck.js
import mongoose from 'mongoose';

const CoordinateSchema = new mongoose.Schema({
    $numberDouble: String
});

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
    coordinates: [CoordinateSchema]
}, { collection: 'shipwrecks' });

export default mongoose.models.Shipwreck || mongoose.model('Shipwreck', ShipwreckSchema);