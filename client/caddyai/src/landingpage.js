// src/LandingPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import FormComponent from './ScoreForm'; // Assume you import your form component
import TopNavbar from './topnavbar'; // Import the new TopNavbar component
import Chatbot from './chatbot';

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
                        <div>
                            <h2>CaddyGPT</h2>
                            <Row style={{ height: '60vh' }}>
                                <Chatbot />
                            </Row>
                            <Row className="bottom-section">

                                <Col className="right-col">
                                    <FormComponent email={userEmail} />
                                </Col>
                            </Row>
                        </div>
                    </section>
                </Container>
            </div>
        </div>
    );
}

export default LandingPage;
