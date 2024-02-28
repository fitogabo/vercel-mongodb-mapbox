/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
        MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
    },
    images: {
        domains: ['api.mapbox.com'],
    },
};

export default nextConfig;