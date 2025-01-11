import React from 'react';
import styled from 'styled-components';

const PopupContainer = styled.div`
  padding: 12px;
  max-width: 300px;
  background: #fff;
  border-radius: 8px;
  font-family: 'Source Sans Pro', sans-serif;
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  font-family: 'Playfair Display', serif;
  color: #2c3e50;
  font-size: 1.2em;
`;

const Description = styled.p`
  margin: 0 0 12px 0;
  font-size: 0.9em;
  line-height: 1.5;
  color: #34495e;
`;

const AIInsight = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
  font-style: italic;
  color: #666;
  font-size: 0.9em;
`;

const WikiLink = styled.a`
  display: inline-block;
  color: #3498db;
  text-decoration: none;
  font-size: 0.9em;
  margin-top: 8px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LandmarkPopup = ({ landmark }) => (
  <PopupContainer>
    <Title>{landmark.title}</Title>
    <Description>{landmark.description}</Description>
    {landmark.enhancedDescription && (
      <AIInsight>
        <strong>AI Insight:</strong> {landmark.enhancedDescription}
      </AIInsight>
    )}
    <WikiLink href={landmark.wikipediaUrl} target="_blank" rel="noopener noreferrer">
      Read more on Wikipedia →
    </WikiLink>
  </PopupContainer>
);

export default LandmarkPopup;
