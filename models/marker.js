// models/marker.js
import mongoose from 'mongoose';

const markerSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Feature'],
        required: true
    },
    properties: {
        fojas: Number,
        number: Number,
        year: Number,
        cbr: String,
        buyer: Number,
        seller: Number,
        property: String,
        commune: String,
        role: String,
        writingDate: String,
        surfaceArea: Number,
        amount: String
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

const featureCollectionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['FeatureCollection'],
        required: true
    },
    features: [markerSchema]
});

export default mongoose.model('Marker', featureCollectionSchema);