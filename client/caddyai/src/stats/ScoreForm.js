import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Modal, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import '../App.css'; // Ensure you import your CSS here if not already imported
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
let golfScores = {};
let golfScoreTotal = 0;
let holesPlayed = 0;


const ScoreForm = ({ email }) => {
    const [fairwayHit, setFairwayHit] = useState(true);
    const [fairwayReason, setFairwayReason] = useState('');
    const [gir, setGir] = useState(true);
    const [girReason, setGirReason] = useState('');
    const [putts, setPutts] = useState(2);
    const [startingHole, setStartingHole] = useState(1);
    const [numberOfHoles, setNumberOfHoles] = useState(18);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [teeBox, setTeeBox] = useState("White");
    const [currentHole, setCurrentHole] = useState(startingHole);
    const [holeScores, setHoleScores] = useState([]); // Array to store hole scores
    const [score, setHoleScore] = useState(4); // Array to store hole score
    const [formState, setFormState] = useState(1); // 1: State 1, 2: State 2, 3: State 3
    const [showEndGameModal, setShowEndGameModal] = useState(false); // State to handle modal visibility
    const [gameID, setGameID] = useState();
    const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false); // State for unsaved changes modal
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        // Fetch courses when component mounts
        fetch('http://localhost:3001/courses')
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => console.error('Error fetching courses:', error));

        if (email == null) {
            notifyUnsuccessfulPost();
        }

    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        golfScoreTotal += score;
        golfScores[currentHole] = score
        holesPlayed += 1;
        const formData = {
            userId: -1,
            fairwayHit,
            fairwayReason,
            gir,
            girReason,
            putts,
            email,
            selectedCourse,
            hole: currentHole,
            dateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),

        };

        console.log('Form Data:', formData); // Debugging: Log form data to verify

        fetch('http://localhost:3001/postscore', {
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
                setHoleScores([...holeScores, { hole: currentHole, score: putts }]); 
                setPutts(2); 
                setCurrentHole(prevHole => prevHole < 18 ? prevHole + 1 : 1); 
                notifySuccessfulPost();

                setTimeout(() => {
                    setSuccess(false); 
                }, 2000);
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('Error submitting data. Please try again.');
                setSuccess(false);
                notifyUnsuccessfulPost();
            });
        if (holesPlayed == numberOfHoles) {
            setFormState(3);
        }
    };

    const handleStart = () => {
        if (!selectedCourse) {
            alert('Please select a course.');
            return;
        }
        const newgameid = uuidv4();
        setGameID(newgameid);
        console.log("game id is:" + newgameid)
        setFormState(2); 
    };

    const handleEndGame = () => {
        setShowEndGameModal(true);
    };

    const handleCloseModal = () => {
        setShowEndGameModal(false);
    };

    const handleConfirmEndGame = () => {
        setFormState(3); 
        setShowEndGameModal(false);
    };

    const handleReturnToState1 = () => {
        setFormState(1); 
        setHoleScores([]); 
    };

    const notifySuccessfulPost = () => {

        toast.success('Success!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
    };

    const notifyUnsuccessfulPost = () => {

        let errorText = "Error! ";
        if (Text != null) {
            errorText += Text;
        }
        toast.warn(errorText, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
    };

    const submitFinalScore = async () => {
        const gameid = gameID
        const formData = {
            gameid,
            datetime: new Date().toISOString().slice(0, 19).replace('T', ' '),
            userid: -1, 
            email: email, 
            total_score: golfScoreTotal, 
            teebox: teeBox,
            scores: golfScores, 
            course: selectedCourse
        };

        try {
            const response = await fetch('http://localhost:3001/gamestats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log('Game stats saved:', data);
        } catch (error) {
            console.error('Error saving game stats:', error);
        }
        handleReturnToState1()
    };



    return (
        <Container className="form-container mt-4">
            {formState === 1 && (

                <Form>
                    {/* Course Selection */}
                    <Row>
                        <Form.Group controlId="golfCourse" className="mb-3">
                            <Form.Label>Golf Course</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                            >
                                <option value="">Select Course</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.course_name}>
                                        {course.course_name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Row>

                    <Row>

                        <Form.Group controlId="teeBox" className="mb-3">
                            <Row>
                                <Form.Label>Tee Box: </Form.Label>
                            </Row>
                            <Row>
                                <ToggleButtonGroup
                                    type="radio"
                                    name="teeBox"
                                    value={teeBox}
                                    onChange={val => setTeeBox(val)}
                                >
                                    <div></div>
                                    <ToggleButton id="tbg-radio-gold" value={"Gold"} className="greyscale-btn">
                                        Gold
                                    </ToggleButton>
                                    <ToggleButton id="tbg-radio-red" value={"Red"} className="greyscale-btn">
                                        Red
                                    </ToggleButton>
                                    <ToggleButton id="tbg-radio-white" value={"White"} className="greyscale-btn">
                                        White
                                    </ToggleButton>
                                    <ToggleButton id="tbg-radio-blue" value={"Blue"} className="greyscale-btn">
                                        Blue
                                    </ToggleButton>
                                    <ToggleButton id="tbg-radio-black" value={"Black"} className="greyscale-btn">
                                        Black
                                    </ToggleButton>

                                </ToggleButtonGroup>
                            </Row>

                        </Form.Group>
                    </Row>

                    <Row>

                        <Form.Group controlId="numberOfHoles" className="mb-3">
                            <Row>
                                <Form.Label>Number of Holes: </Form.Label>
                            </Row>
                            <Row>
                                <ToggleButtonGroup
                                    type="radio"
                                    name="numberOfHoles"
                                    value={numberOfHoles}
                                    onChange={val => setNumberOfHoles(val)}
                                >
                                    <div></div>
                                    <ToggleButton id="tbg-radio-9" value={18} className="greyscale-btn">
                                        18 Holes
                                    </ToggleButton>
                                    <ToggleButton id="tbg-radio-18" value={18} className="greyscale-btn">
                                        9 Holes
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Row>

                        </Form.Group>
                    </Row>

                    <Form.Group controlId="startingHole" className="mb-3">
                        <Row>
                            <Form.Label>Starting Hole</Form.Label>
                        </Row>
                        <Row>
                            <ToggleButtonGroup
                                type="radio"
                                name="startingHole"
                                value={startingHole}
                                onChange={val => setStartingHole(val)}
                            >
                                <ToggleButton id="tbg-radio-1" value={1} className="greyscale-btn">
                                    Hole 1
                                </ToggleButton>
                                <ToggleButton id="tbg-radio-10" value={10} className="greyscale-btn">
                                    Hole 10
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Row>

                    </Form.Group>

                    <Button
                        variant="primary"
                        onClick={handleStart}
                    >
                        Start
                    </Button>
                </Form>
            )}

            {formState === 2 && (

                <Form onSubmit={handleSubmit}>
                    <Row>

                        <Col>
                         
                            <Form.Group controlId="golfHole" className="mb-4">
                                <Form.Label>Current Hole</Form.Label>
                                <div className="d-flex align-items-center">
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setCurrentHole(currentHole > 1 ? score - 1 : 1)}
                                    >
                                        -
                                    </Button>
                                    <span className="mx-3">{currentHole}</span>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setCurrentHole(currentHole < 18 ? currentHole + 1 : 1)}
                                    >
                                        +
                                    </Button>
                                </div>
                            </Form.Group>

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

                        </Col>
                        <Col>

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

                            <Form.Group controlId="score" className="mb-4">
                                <Form.Label>Score</Form.Label>
                                <div className="d-flex align-items-center">
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setHoleScore(score > 0 ? score - 1 : 0)}
                                    >
                                        -
                                    </Button>
                                    <span className="mx-3">{score}</span>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setHoleScore(score + 1)}
                                    >
                                        +
                                    </Button>
                                </div>
                            </Form.Group>



                            {/* Submit and End Game Buttons */}


                        </Col>

                        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

                        <Modal show={showEndGameModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Exit</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Are you sure you want to end the game?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Cancel
                                </Button>
                                <Button variant="danger" onClick={handleConfirmEndGame}>
                                    Yes, End Game
                                </Button>
                            </Modal.Footer>
                        </Modal>

                    </Row>
                    <Button
                        variant={success ? "success" : "primary"}
                        type="submit"
                        style={{ borderColor: success ? "green" : "initial" }}
                    >
                        Submit
                    </Button>

                    <Button
                        variant="danger"
                        className="ms-2"
                        onClick={handleEndGame}
                    >
                        End Game
                    </Button>
                </Form>
            )}

            {formState === 3 && (
                <div className="summary-container mt-4">
                    <h3>Summary</h3>
                    <ul>
                        {holeScores.map((score) => (
                            <li key={score.hole}>
                                Hole {score.hole}: {score.score} putts
                            </li>
                        ))}
                    </ul>
                    <Button variant="primary" onClick={submitFinalScore}>
                        Submit Scorecard
                    </Button>
                    <Button variant="primary" onClick={handleReturnToState1}>
                        Exit
                    </Button>

                </div>
            )}
        </Container>
    );
};

export default ScoreForm;
