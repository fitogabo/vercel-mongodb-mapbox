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
  }, [lat, lng, zoom]);

  return (
    <div ref={mapContainer} className="map-container w-full h-full" />
  );
}