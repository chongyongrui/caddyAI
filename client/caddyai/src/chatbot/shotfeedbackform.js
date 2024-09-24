import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Container, Row, Col, Modal, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import './ShotFeedbackForm.css';


const ShotFeedBackForm = ({ initialData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);
  const [distance, setDistance] = useState(initialData?.distance || 150);
  const [surface, setSurface] = useState(initialData?.surface || 'Fairway');
  const [slope, setSlope] = useState(initialData?.slope || 'Flat');
  const [wind, setWind] = useState(initialData?.wind || 'negligible');
  const [lie, setLie] = useState(initialData?.lie || 'flat');
  const [clubChoice, setClubChoice] = useState('7 iron');

  useEffect(() => {
    setFormData(initialData); // Update form data when initialData changes
}, [initialData]);

const handleSubmit = async (e) => {
  e.preventDefault();
  const updatedData = { distance, surface, slope, wind, lie, clubChoice };

  try {
    const response = await fetch('http://localhost:3001/shotfeedback', { // Adjust endpoint as necessary
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log('Feedback submitted:', result);
    onClose(); // Close the form after submission
  } catch (error) {
    console.error('Error submitting feedback:', error);
  }
};

  return (
    <div className="overlay">
      <div className="new-form-container">
        <button className="close-button" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <h4>Edit Shot Data</h4>

          <div>
            <label>Distance:</label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            />
          </div>

          <div>
            <label>Surface:</label>
            <select value={surface} onChange={(e) => setSurface(e.target.value)}>
              <option value="Fairway">Fairway</option>
              <option value="Rough">Rough</option>
              <option value="Thick Rough">Thick Rough</option>
              <option value="Sand">Sand</option>
              <option value="Dirt">Dirt</option>
            </select>
          </div>

          <div>
            <label>Slope:</label>
            <select value={slope} onChange={(e) => setSlope(e.target.value)}>
              <option value="Uphill">Uphill</option>
              <option value="Downhill">Downhill</option>
              <option value="Flat">Flat</option>
            </select>
          </div>

          <div>
            <label>Wind:</label>
            <select value={wind} onChange={(e) => setWind(e.target.value)}>
              <option value="→">→ Right</option>
              <option value="←">← Left</option>
              <option value="↑">↑ Tailwind</option>
              <option value="↓">↓ Headwind</option>
              <option value="negligible">Negligible</option>
            </select>
          </div>

          <div>
            <label>Lie:</label>
            <select value={lie} onChange={(e) => setLie(e.target.value)}>
              <option value="flat">Flat</option>
              <option value="slope right">Slope Right</option>
              <option value="slope left">Slope Left</option>
              <option value="slope back">Slope Back</option>
              <option value="slope forward">Slope Forward</option>
            </select>
          </div>

          <div>
            <label>Lie:</label>
            <select value={lie} onChange={(e) => setClubChoice(e.target.value)}>
              <option value="flat">Driver</option>
              <option value="3 wood">3 Wood</option>
              <option value="5 wood">5 Wood</option>
              <option value="7 wood">7 Wood</option>
              <option value="3 hybrid">3 Hybrid</option>
              <option value="4 hybrid">4 Hybrid</option>
              <option value="5 hybrid">5 Hybrid</option>
              <option value="6 hybrid">6 Hybrid</option>
              <option value="3 iron">3 Iron</option>
              <option value="4 iron">4 Iron</option>
              <option value="5 iron">5 Iron</option>
              <option value="6 iron">6 Iron</option>
              <option value="7 iron">7 Iron</option>
              <option value="8 iron">8 Iron</option>
              <option value="9 iron">9 Iron</option>
              <option value="G wedge">Gap Wedge</option>
              <option value="S wedge">Sand Wedge</option>
              <option value="L wedge">Lob Wedge</option>
            </select>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default ShotFeedBackForm;
