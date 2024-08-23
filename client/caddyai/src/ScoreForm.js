import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './App.css'; // Ensure you import your CSS here if not already imported

const ScoreForm = ({ email }) => {
    const [fairwayHit, setFairwayHit] = useState(true);
    const [fairwayReason, setFairwayReason] = useState('');
    const [gir, setGir] = useState(true);
    const [girReason, setGirReason] = useState('');
    const [putts, setPutts] = useState(2);
    const [hole, setHole] = useState(1); // Default hole value
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [currentHole, setCurrentHole] = useState(1);
   

    useEffect(() => {
        // Fetch courses when component mounts
        fetch('http://localhost:3001/courses')
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => console.error('Error fetching courses:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            userId: -1,
            fairwayHit,
            fairwayReason,
            gir,
            girReason,
            putts,
            email,
            selectedCourse, // Use the correct field name here
            hole: currentHole,
            dateTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };

        console.log('Form Data:', formData); // Debugging: Log form data to verify

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

                // Preserve form state and increment hole number
                setTimeout(() => {
                    setSuccess(false); // Reset success after a delay
                }, 2000);

                setCurrentHole(prevHole => prevHole < 18 ? prevHole + 1 : 1); // Wrap around hole number
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
                {/* Course Selection */}
                <Form.Group controlId="golfCourse" className="mb-3">
                    <Form.Label>Golf Course</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedCourse}
                        onChange={(e) => {
                            console.log('Selected Course:', e.target.value); // Debugging: Log selected course
                            setSelectedCourse(e.target.value);
                        }}
                    >
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.course_name}>
                                {course.course_name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                {/* Hole Selection */}
                <Form.Group controlId="golfHole" className="mb-3">
                    <Form.Label>Current Hole</Form.Label>
                    <Form.Control
                        type="number"
                        value={currentHole}
                        onChange={(e) => setCurrentHole(parseInt(e.target.value, 10))}
                        min={1}
                        max={18}
                    />
                </Form.Group>

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
