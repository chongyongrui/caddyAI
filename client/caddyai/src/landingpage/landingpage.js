import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import FormComponent from '../stats/ScoreForm.js';
import TopNavbar from '../utils/TopNavBar.js';
import Chatbot from '../chatbot/Chatbot.js';
import "./LandingPage.css";

const { oneHotEncode } = require("../KNNClassifier/Encoder.js");

const LandingPage = ({ email, loggedIn, setLoggedIn }) => {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [userEmail, setUserEmail] = useState(localStorage.getItem("email") || "");
    const [hasFetchedData, setHasFetchedData] = useState(false); // Add flag to prevent refetching
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        setLoggedIn(true);

        // Fetch user email only once
        if (!userEmail) {
            axios
                .get("http://localhost:3001/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setUserEmail(response.data.email);
                    localStorage.setItem("email", response.data.email);
                })
                .catch((error) => {
                    console.error("Error fetching user email:", error);
                });
        }

        // Fetch shot history data only if it hasn't been fetched before
        if (userEmail && !hasFetchedData) {
            axios
                .get("http://localhost:3001/shotfeedback/getlast1000", {
                    params: { email: userEmail },
                })
                .then((response) => {
                    const shotData = response.data;
                    console.log(shotData);
                    // Save encoded shot data to local storage
                    localStorage.setItem("encodedShotData", JSON.stringify(shotData));
                    setListOfPosts(shotData);
                    setHasFetchedData(true); // Mark data as fetched
                })
                .catch((error) => {
                    console.error("Error fetching shot history data:", error);
                });
        }
    }, [loggedIn, navigate, userEmail, hasFetchedData, setLoggedIn]);

    const encodedShotData = JSON.parse(localStorage.getItem("encodedShotData"));

    return (
        <div className="mainContainer">
            <TopNavbar userEmail={userEmail} className="top-navbar-custom " />
            <div className="content-body">
                <Container fluid>
                    <section className="main">
                        <Tab.Container defaultActiveKey="caddy">
                            <div>
                                <h2>CaddyGPT</h2>
                                <Row>
                                    <Nav
                                        variant="tabs"
                                        className="ml-auto custom-tabs"
                                        style={{ width: "100%", justifyContent: "flex-end" }}
                                    >
                                        <Nav.Item style={{ color: "white" }}>
                                            <Nav.Link eventKey="caddy">Caddy</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="scorecard">Scorecard</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Row>
                                <Row>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="caddy">
                                            <Chatbot
                                                email={userEmail}
                                                encodedShotData={encodedShotData}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="scorecard">
                                            <Row className="bottom-section">
                                                <Col className="right-col">
                                                    <FormComponent email={userEmail} />
                                                </Col>
                                            </Row>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Row>
                            </div>
                        </Tab.Container>
                    </section>
                </Container>
            </div>
        </div>
    );
};

export default LandingPage;
