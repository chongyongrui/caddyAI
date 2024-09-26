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
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // If no token, navigate to the login page
      navigate("/login");
      return;
    }

    setLoggedIn(true);
    setUserEmail(localStorage.getItem("email"));

    axios
      .get("http://localhost:3001/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUserEmail(response.data.email);
      })
      .catch((error) => {
        console.error("Error fetching user email:", error);
      });

    axios
      .get("http://localhost:3001/shotfeedback/getlast1000", {
        params: { email: userEmail },
      })
      .then((response) => {
        const shotData = response.data;
        console.log(shotData);
        // const encodedData = oneHotEncode(shotData);
        localStorage.setItem("encodedShotData", JSON.stringify(shotData));
        setListOfPosts(shotData);
      })
      .catch((error) => {
        console.error("Error fetching shot history data:", error);
      });
  }, [loggedIn, navigate, userEmail]);
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
                <div></div> <div></div> <div></div>
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
