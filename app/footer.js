// app/footer.js
// NO USADO

'use client'
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

function Footer({ apiURL }) {
    const mapContainer = useRef(null);
    const [dbStatus, setDbStatus] = useState('Checking...');

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZ2Fib3BhbnRlcmEiLCJhIjoiY2xlZG52M3R2MDV4ZDNvbXJwN2hlZXZmMCJ9.T4YSPRr9Hbxp0ID5-NLkCg'; // replace with your Mapbox access token

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [5, 34], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });

        map.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            })
        );

        // Check database connection status
        fetch(apiURL)
            .then(response => response.json())
            .then(data => setDbStatus(data.status))
            .catch(error => {
                console.error(error);
                setDbStatus('Error connecting to database');
            });

    }, [apiURL]);

    return (
        <div>
            <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />
            <p>Database status: {dbStatus}</p>
        </div>
    );
}

export default Footer;