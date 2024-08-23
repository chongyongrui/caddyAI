import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './App.css'; // Ensure you import your CSS here if not already imported

const ScoreForm = () => {
    const [fairwayHit, setFairwayHit] = useState(true);
    const [fairwayReason, setFairwayReason] = useState('');
    const [gir, setGir] = useState(true);
    const [girReason, setGirReason] = useState('');
    const [putts, setPutts] = useState(2);
    const [hole, setHole] = useState(1); // Default hole value
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            userId: -1, // Set userId to -1 for testing
            fairwayHit,
            fairwayReason,
            gir,
            girReason,
            putts,
            course: 'Default Golf Course', // Example course name, you may adjust based on your needs
            hole,
            dateTime: new Date().toISOString()
        };

        fetch('http://localhost:3001/postscore', { // Ensure this matches your backend endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSuccess(true);
                setError('');
                setHole(hole + 1); // Increment the hole value
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('Error submitting data. Please try again.');
                setSuccess(false);
            });
    };

    return (
        <Container className="form-container mt-4">
            <Form onSubmit={handleSubmit}>
                {/* Fairway Hit */}
                <Row className="align-items-center mb-3">
                    <Col xs="auto">
                        <Form.Group controlId="fairwayHit" className="mb-0">
                            <Form.Check
                                type="checkbox"
                                label="FW"
                                checked={fairwayHit}
                                onChange={(e) => setFairwayHit(e.target.checked)}
                                className="me-2"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        {!fairwayHit && (
                            <Form.Group controlId="fairwayReason" className="mb-0">
                                <Form.Control
                                    as="select"
                                    value={fairwayReason}
                                    onChange={(e) => setFairwayReason(e.target.value)}
                                >
                                    <option value="">Select Reason</option>
                                    <option value="Short">Short</option>
                                    <option value="Long">Long</option>
                                    <option value="Left">Left</option>
                                    <option value="Right">Right</option>
                                    <option value="Bunker">Bunker</option>
                                </Form.Control>
                            </Form.Group>
                        )}
                    </Col>
                </Row>

                {/* GIR */}
                <Row className="align-items-center mb-3">
                    <Col xs="auto">
                        <Form.Group controlId="gir" className="mb-0">
                            <Form.Check
                                type="checkbox"
                                label="GIR"
                                checked={gir}
                                onChange={(e) => setGir(e.target.checked)}
                                className="me-2"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        {!gir && (
                            <Form.Group controlId="girReason" className="mb-0">
                                <Form.Control
                                    as="select"
                                    value={girReason}
                                    onChange={(e) => setGirReason(e.target.value)}
                                >
                                    <option value="">Select Reason</option>
                                    <option value="Short">Short</option>
                                    <option value="Long">Long</option>
                                    <option value="Left">Left</option>
                                    <option value="Right">Right</option>
                                    <option value="Bunker">Bunker</option>
                                </Form.Control>
                            </Form.Group>
                        )}
                    </Col>
                </Row>

                {/* Putts */}
                <Form.Group controlId="putts" className="mb-4">
                    <Form.Label>Putts</Form.Label>
                    <div className="d-flex align-items-center">
                        <Button
                            variant="outline-secondary"
                            onClick={() => setPutts(putts > 0 ? putts - 1 : 0)}
                        >
                            -
                        </Button>
                        <span className="mx-3">{putts}</span>
                        <Button
                            variant="outline-secondary"
                            onClick={() => setPutts(putts + 1)}
                        >
                            +
                        </Button>
                    </div>
                </Form.Group>

                {/* Submit Button */}
                <Button
                    variant={success ? "success" : "primary"}
                    type="submit"
                    style={{ borderColor: success ? "green" : "initial" }}
                >
                    Submit
                </Button>

                {/* Error Message */}
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            </Form>
        </Container>
    );
};

export default ScoreForm;
