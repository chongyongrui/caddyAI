// src/LandingPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import FormComponent from './ScoreForm'; // Assume you import your form component
import TopNavbar from './topnavbar'; // Import the new TopNavbar component
import Chatbot from './chatbot';
import "./landingpage.css";

const LandingPage = () => {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // Fetch the user's email
        axios.get('http://localhost:3001/auth/me', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setUserEmail(response.data.email);
            })
            .catch(error => {
                console.error('Error fetching user email:', error);
            });

        axios.get('http://localhost:3001/postscore') // Adjusted endpoint to match the backend route
            .then((response) => {
                console.log(response.data);
                setListOfPosts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="mainContainer">

            <TopNavbar userEmail={userEmail} className='top-navbar-custom ' />


            <div className='content-body'>
            <Container fluid>
                <section className='main'>
                    <Tab.Container defaultActiveKey="caddy">
                        <div>
                            <h2>CaddyGPT</h2>
                            <Row>
                            <Nav variant="tabs" className="ml-auto custom-tabs" style={{ width: '100%', justifyContent: 'flex-end' }}>
                                    <Nav.Item style={{color: "white"}}>
                                        <Nav.Link eventKey="caddy">Caddy</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="scorecard">Scorecard</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Row>
                            <div></div> <div></div> <div></div>
                            <Row>
                                <Tab.Content>
                                    <Tab.Pane eventKey="caddy">
                                        <Chatbot />
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
}

export default LandingPage;
