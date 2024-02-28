// app/map/page.js
'use client'

import React, { useRef, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const lng = -73.245209;
  const lat = -39.819586;
  const zoom = 15;

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
      pitch: 60,
      bearing: -60,
      antialias: true
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Fetch shipwrecks data from API when map is loaded
    map.current.on('load', async () => {
      console.log('Map loaded, fetching data...');
      const response = await fetch('/api/getMarkers');
      const data = await response.json();

      console.log('Data fetched from API:', data);

      if (data.success && data.data && data.data.features && data.data.features.length > 0) {
        console.log('Adding data to map...');
        map.current.addSource('shipwrecks', {
          type: 'geojson',
          data: data.data
        });

        map.current.addLayer({
          id: 'shipwrecks',
          type: 'circle',
          source: 'shipwrecks',
          paint: {
            'circle-radius': 10,
            'circle-color': '#b42222'
          }
        });
        console.log('Data added to map');
      } else {
        console.error('Error fetching data from API or no data available:', data.message);
      }
    });
  }, [lat, lng, zoom]);

  return (
    <div ref={mapContainer} className="map-container w-full h-full" />
  );
}