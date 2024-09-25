import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './ShotFeedbackForm.css';

const ShotFeedBackForm = ({ initialData, userEmail, onClose, onSubmit }) => {
  const [distance, setDistance] = useState(initialData?.distance || 150);
  const [surface, setSurface] = useState(initialData?.surface || 'Fairway');
  const [slope, setSlope] = useState(initialData?.slope || 'Flat');
  const [pinElevation, setPinElevation] = useState(initialData?.pinElevation || 'Neutral');
  const [wind, setWind] = useState(initialData?.wind || 'negligible');
  const [lie, setLie] = useState(initialData?.lie || 'flat');
  const [clubChoice, setClubChoice] = useState(initialData?.clubChoice || '7 iron');

  useEffect(() => {
    setDistance(initialData?.distance || 150);
    setSurface(initialData?.surface || 'Fairway');
    setSlope(initialData?.slope || 'Flat');
    setPinElevation(initialData?.pinElevation || 'Neutral');
    setWind(initialData?.wind || 'negligible');
    setLie(initialData?.lie || 'flat');
    setClubChoice(initialData?.clubChoice || '7 iron');
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      distance,
      surface,
      slope,
      pinElevation,
      wind,
      lie,
      clubChoice,
    };

    console.log(`${userEmail} is the user email`);

    try {
      const response = await fetch('http://localhost:3001/shotfeedback/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          ...updatedData,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Feedback submitted:', result);
      onClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="overlay">
      <div className="new-form-container">
        <button className="close-button" onClick={onClose}>X</button>

        <h4>Input Shot Data</h4>

        <form onSubmit={handleSubmit}>
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
            <label>Pin Elevation:</label>
            <select value={pinElevation} onChange={(e) => setPinElevation(e.target.value)}>
              <option value="Neutral">Neutral</option>
              <option value="Above">Above</option>
              <option value="Below">Below</option>
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
            <label>Club:</label>
            <select value={clubChoice} onChange={(e) => setClubChoice(e.target.value)}>
              <option value="Driver">Driver</option>
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
