import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Container, Row, Col, Modal, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import './shotpredictionform.css';


const ShotFeedBackForm = ({ initialData, onClose, onSubmit }) => {
  const [distance, setDistance] = useState(initialData?.distance || 150);
  const [surface, setSurface] = useState(initialData?.surface || 'Fairway');
  const [slope, setSlope] = useState(initialData?.slope || 'Flat');
  const [wind, setWind] = useState(initialData?.wind || 'negligible');
  const [lie, setLie] = useState(initialData?.lie || 'flat');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { distance, surface, slope, wind, lie };
    onSubmit(updatedData);
    onClose();
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

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default ShotFeedBackForm;
