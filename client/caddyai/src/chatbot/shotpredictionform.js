import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Container, Row, Col, Modal, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import './shotpredictionform.css';

const ShotPredictionForm = ({ onClose, onSubmit }) => {
  // Separate state for each category
  const [selectedSurface, setSelectedSurface] = useState(null);
  const [selectedSlope, setSelectedSlope] = useState(null);
  const [selectedWind, setSelectedWind] = useState(null);
  const [selectedLie, setSelectedLie] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(150)
  

  const scrollContainerRef = useRef(null);

  const distance = 150;
  const surface = ['Fairway', 'Rough', 'Thick Rough', 'Sand', 'Dirt'];
  const slope = ['Uphill', 'Downhill', 'Flat'];
  const wind = ['→', '←', '↑', '↓', 'negligible'];
  const lie = ['flat', 'slope right', 'slope left', 'slope back', 'slope forward'];

  // Scroll into view when an option is selected
  const scrollToSelected = (index) => {
    if (scrollContainerRef.current) {
      const selectedElement = scrollContainerRef.current.children[index];
      const containerWidth = scrollContainerRef.current.clientWidth;
      const elementWidth = selectedElement.clientWidth;
      const elementLeft = selectedElement.offsetLeft;

      const scrollLeft = elementLeft - (containerWidth / 2 - elementWidth / 2);
      scrollContainerRef.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (selectedSurface !== null) scrollToSelected(selectedSurface);
  }, [selectedSurface]);

  useEffect(() => {
    if (selectedSlope !== null) scrollToSelected(selectedSlope);
  }, [selectedSlope]);

  useEffect(() => {
    if (selectedWind !== null) scrollToSelected(selectedWind);
  }, [selectedWind]);

  useEffect(() => {
    if (selectedLie !== null) scrollToSelected(selectedLie);
  }, [selectedLie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedChoices = {
      distance: distance[selectedDistance],
      surface: surface[selectedSurface],
      slope: slope[selectedSlope],
      wind: wind[selectedWind],
      lie: lie[selectedLie],
    };
    onSubmit(selectedChoices); // Pass the selected choices to the parent component
    onClose();
  };

  return (
    <div className="overlay">
      <div className="form-container">
        <button className="close-button" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit} className="horizontal-scroll-form">
          <h4> Distance (m)</h4><br/>
          <div className="d-flex align-items-center">
              <Button
                  variant="outline-secondary"
                  onClick={() => setSelectedDistance(selectedDistance > 20 ? selectedDistance - 10 : 20)}
              >
                  -
              </Button>
              <span className="mx-3">{selectedDistance}</span>
              <Button
                  variant="outline-secondary"
                  onClick={() => setSelectedDistance(selectedDistance < 300 ? selectedDistance + 10 : 300)}
              >
                  +
              </Button>
          </div>
          <br></br>
          <h4>Surface</h4>
          <div className="scroll-container" ref={scrollContainerRef}>
            {surface.map((option, index) => (
              <div
                key={index}
                className={`scroll-item ${selectedSurface === index ? 'selected' : ''}`}
                onClick={() => setSelectedSurface(index)}
              >
                {option}
              </div>
            ))}
          </div>
          <br></br>
          <h4>Pin Elevation</h4>
          <div className="scroll-container" ref={scrollContainerRef}>
            {slope.map((option, index) => (
              <div
                key={index}
                className={`scroll-item ${selectedSlope === index ? 'selected' : ''}`}
                onClick={() => setSelectedSlope(index)}
              >
                {option}
              </div>
            ))}
          </div>
          <br></br>
          <h4> Wind </h4>
          <div className="scroll-container" ref={scrollContainerRef}>
            {wind.map((option, index) => (
              <div
                key={index}
                className={`scroll-item ${selectedWind === index ? 'selected' : ''}`}
                onClick={() => setSelectedWind(index)}
              >
                {option}
              </div>
            ))}
          </div>
          <br></br>
          <h4> Lie</h4>
          <div className="scroll-container" ref={scrollContainerRef}>
            {lie.map((option, index) => (
              <div
                key={index}
                className={`scroll-item ${selectedLie === index ? 'selected' : ''}`}
                onClick={() => setSelectedLie(index)}
              >
                {option}
              </div>
            ))}
          </div>
          <button type="submit" disabled={selectedSurface === null || selectedSlope === null || selectedWind === null || selectedLie === null}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ShotPredictionForm;
