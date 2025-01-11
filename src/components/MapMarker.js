import React from 'react';
import styled from 'styled-components';

const MarkerContainer = styled.div`
  width: 30px;
  height: 30px;
  cursor: pointer;
  transform: translate(-50%, -100%);
`;

const MarkerIcon = styled.div`
  width: 100%;
  height: 100%;
  background: #8b4513;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  position: relative;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #8b4513;
  }

  &:hover {
    transform: scale(1.1);
    background: #a0522d;
    &::after {
      border-top-color: #a0522d;
    }
  }
`;

const MapMarker = ({ onClick }) => (
  <MarkerContainer onClick={onClick}>
    <MarkerIcon />
  </MarkerContainer>
);

export default MapMarker;
