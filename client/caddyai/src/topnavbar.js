// src/TopNavbar.js

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logout from './logout'; // Adjust the import path if needed

const TopNavbar = ({ userEmail }) => {
    return (
        <div className='content-topbar'>
            <Navbar bg="dark" variant="dark" expand="lg" className="top-navbar-custom">
                <Container>
                    <Navbar.Brand as={Link} to="/">CaddyAi</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/rounds">Rounds</Nav.Link>
                            <Nav.Link as={Link} to="/stats">Stats</Nav.Link>
                            <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
                            <Logout />
                            <Nav.Link as={Link} to="/profile">{userEmail} Profile</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/profile">
                                <img
                                    src="your-profile-pic-url-here"
                                    alt="Profile"
                                    className="profile-pic"
                                />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default TopNavbar;
