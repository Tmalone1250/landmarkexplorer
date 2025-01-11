import React, { useState, useEffect, useCallback } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import styled from 'styled-components';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getLandmarks } from './services/wikiService';
import { getAIEnhancedDescription } from './services/aiService';
import MapMarker from './components/MapMarker';
import LandmarkPopup from './components/LandmarkPopup';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Title = styled.h1`
  position: absolute;
  top: 20px;
  left: 20px;
  margin: 0;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  font-family: 'Playfair Display', serif;
  color: #2c3e50;
  z-index: 1;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

function App() {
  const [viewState, setViewState] = useState({
    longitude: -74.0060,
    latitude: 40.7128,
    zoom: 13
  });
  const [landmarks, setLandmarks] = useState([]);
  const [selectedLandmark, setSelectedLandmark] = useState(null);

  const fetchLandmarks = useCallback(async (bounds) => {
    try {
      const newLandmarks = await getLandmarks(bounds);
      setLandmarks(newLandmarks);
    } catch (error) {
      console.error('Error fetching landmarks:', error);
    }
  }, []);

  const handleMapMove = useCallback((evt) => {
    if (evt.target) {
      const bounds = evt.target.getBounds();
      fetchLandmarks(bounds);
    }
  }, [fetchLandmarks]);

  const handleMarkerClick = async (landmark) => {
    try {
      const enhancedDescription = await getAIEnhancedDescription(landmark);
      setSelectedLandmark({ ...landmark, enhancedDescription });
    } catch (error) {
      console.error('Error getting AI description:', error);
      setSelectedLandmark(landmark);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newViewState = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          zoom: 13
        };
        setViewState(newViewState);
        // Fetch landmarks for initial position
        const map = document.querySelector('.mapboxgl-map')?.__mapboxgl;
        if (map) {
          const bounds = map.getBounds();
          fetchLandmarks(bounds);
        }
      });
    }
  }, [fetchLandmarks]);

  return (
    <AppContainer>
      <Title>Landmark Explorer</Title>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        onMoveEnd={handleMapMove}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        {landmarks.map((landmark) => (
          <Marker
            key={landmark.id}
            latitude={landmark.latitude}
            longitude={landmark.longitude}
            anchor="bottom"
          >
            <MapMarker onClick={() => handleMarkerClick(landmark)} />
          </Marker>
        ))}

        {selectedLandmark && (
          <Popup
            latitude={selectedLandmark.latitude}
            longitude={selectedLandmark.longitude}
            onClose={() => setSelectedLandmark(null)}
            closeOnClick={false}
            anchor="bottom"
          >
            <LandmarkPopup landmark={selectedLandmark} />
          </Popup>
        )}
      </Map>
    </AppContainer>
  );
}

export default App;
