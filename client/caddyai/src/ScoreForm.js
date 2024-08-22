import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './App.css'; // Ensure you import your CSS here if not already imported

const ScoreForm = () => {
    const [fairwayHit, setFairwayHit] = useState(true);
    const [fairwayReason, setFairwayReason] = useState('');
    const [gir, setGir] = useState(true);
    const [girReason, setGirReason] = useState('');
    const [putts, setPutts] = useState(2);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            userId: -1, // Set userId to -1 for testing
            fairwayHit,
            fairwayReason,
            gir,
            girReason,
            putts,
        };

        console.log(formData);

        fetch('http://localhost:3001/Posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // You can add a success message or reset the form here
            })
            .catch((error) => console.error('Error:', error));
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

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default ScoreForm;
