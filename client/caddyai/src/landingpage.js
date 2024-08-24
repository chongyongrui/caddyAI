// src/LandingPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import FormComponent from './ScoreForm'; // Assume you import your form component
import TopNavbar from './topnavbar'; // Import the new TopNavbar component

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
            <TopNavbar userEmail={userEmail} /> {/* Use TopNavbar here */}
            <div className='content-body'>
                <Container fluid>
                    <section className='main'>
                        <div>
                            <h2>CaddyGPT</h2>
                            <ul className='feed'></ul>
                            <Row style={{ height: '60vh' }}>
                                <div className='bottom-section'>
                                    <div className='input-container'>
                                        <input />
                                        <div id='submit'>Go ⏎</div>
                                    </div>
                                    <br />
                                    <p className='info'>
                                        CaddyGPT is your personal golf caddy to help you shoot lower scores!
                                    </p>
                                </div>
                            </Row>
                            <Row className="bottom-section-no-scroll">
                                
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
