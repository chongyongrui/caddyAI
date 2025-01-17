// src/TopNavbar.js

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logout from './Logout'; // Adjust the import path if needed

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

                        </Nav>
                        <Nav>
                            <Logout />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default TopNavbar;
