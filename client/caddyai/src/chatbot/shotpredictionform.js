import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import './shotpredictionform.css';

const ShotPredictionForm = ({ onClose, onSubmit, isFeedback = false }) => {
  const [selectedSurface, setSelectedSurface] = useState(null);
  const [selectedSlope, setSelectedSlope] = useState(null);
  const [selectedWind, setSelectedWind] = useState(null);
  const [selectedLie, setSelectedLie] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(150);

  const surfaceRef = useRef(null);
  const slopeRef = useRef(null);
  const windRef = useRef(null);
  const lieRef = useRef(null);

  const [feedbackOption, setFeedbackOption] = useState('Yes'); // For feedback-specific option

  const surface = ['Fairway', 'Rough', 'Thick Rough', 'Sand', 'Dirt'];
  const slope = ['Uphill', 'Downhill', 'Flat'];
  const wind = ['→', '←', '↑', '↓', 'negligible'];
  const lie = ['flat', 'slope right', 'slope left', 'slope back', 'slope forward'];

  // Scroll into view when an option is selected
  const scrollToSelected = (index, ref) => {
    if (ref.current) {
      const selectedElement = ref.current.children[index];
      const containerWidth = ref.current.clientWidth;
      const elementWidth = selectedElement.clientWidth;
      const elementLeft = selectedElement.offsetLeft;

      const scrollLeft = elementLeft - (containerWidth / 2 - elementWidth / 2);
      ref.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (selectedSurface !== null) scrollToSelected(selectedSurface, surfaceRef);
  }, [selectedSurface]);

  useEffect(() => {
    if (selectedSlope !== null) scrollToSelected(selectedSlope, slopeRef);
  }, [selectedSlope]);

  useEffect(() => {
    if (selectedWind !== null) scrollToSelected(selectedWind, windRef);
  }, [selectedWind]);

  useEffect(() => {
    if (selectedLie !== null) scrollToSelected(selectedLie, lieRef);
  }, [selectedLie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedChoices = {
      distance: selectedDistance, // Use the selectedDistance directly
      surface: surface[selectedSurface],
      slope: slope[selectedSlope],
      wind: wind[selectedWind],
      lie: lie[selectedLie],
    };

    if (isFeedback) {
      selectedChoices.feedbackOption = feedbackOption;
      // Submit to the feedback DB table
      console.log("Submitting feedback data", selectedChoices);
      // You would send this data to your feedback DB table here
    } else {
      // Submit to the regular DB table
      console.log("Submitting shot prediction data", selectedChoices);
      // You would send this data to your prediction DB table here
    }

    onSubmit(selectedChoices);
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
          <br />
          <h4>Surface</h4>
          <div className="scroll-container" ref={surfaceRef}>
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
          <br />
          <h4>Pin Elevation</h4>
          <div className="scroll-container" ref={slopeRef}>
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
          <br />
          <h4> Wind </h4>
          <div className="scroll-container" ref={windRef}>
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
          <br />
          <h4> Lie</h4>
          <div className="scroll-container" ref={lieRef}>
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
          <br></br>

          {isFeedback && (
            <>
              <h4>Is Feedback?</h4>
              <div>
                <Form.Check
                  inline
                  label="Yes"
                  type="radio"
                  checked={feedbackOption === 'Yes'}
                  onChange={() => setFeedbackOption('Yes')}
                />
                <Form.Check
                  inline
                  label="No"
                  type="radio"
                  checked={feedbackOption === 'No'}
                  onChange={() => setFeedbackOption('No')}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={selectedSurface === null || selectedSlope === null || selectedWind === null || selectedLie === null}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShotPredictionForm;
