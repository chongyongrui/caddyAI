import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import FormComponent from './ScoreForm'; // Assume you import your form component

function App() {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts")
      .then((response) => {
        console.log(response.data);
        setListOfPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className='app'>
      {/* ////////////////top links//////////////////// */}

      <div className='content-topbar'>
        <Navbar bg="dark" variant="dark" expand="lg" className="top-navbar-custom">
          <Container>
            <Navbar.Brand href="#">CaddyAi</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#rounds">Rounds</Nav.Link>
                <Nav.Link href="#stats">Stats</Nav.Link>
                <Nav.Link href="#settings">Settings</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="#profile">
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

      <div className='content-body'>
        <Container fluid>
          <section className='main'>
            {/* ////////////////chat section//////////////////// */}
            <div>
              <h2>CaddyGPT</h2>
              <ul className='feed'></ul>

              <Row style={{ height: '60vh' }}>
                <div className='bottom-section'>
                  <div className='input-container'>
                    <input />
                    <div id='submit'>Go ⏎</div>
                  </div>
                  <br></br>
                  <p className='info'>
                    CaddyGPT is your personal golf caddy to help you shoot lower scores!
                  </p>
                </div>
              </Row>

              {/* ////////////////bottom section with 30/70 columns//////////////////// */}
              <Row className="bottom-section-no-scroll">
                <Col xs={4} className="left-col">
                  <b>Default Golf Club - Dune Course</b>
                  <br></br>
                  Hole 3
                  <br></br>
                  Par 4


                  <div>
                    {listOfPosts.map((post) => (
                      <div className='post' key={post.id}>
                        <div>
                          <div className='title'>{post.title}</div>
                          <div className='body'>{post.postText}</div>
                          <div className='footer'>{post.username}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Col>
                <Col className="right-col">
                  <FormComponent />
                </Col>
              </Row>
            </div>
          </section>
        </Container>
      </div>
    </div>
  );
}

export default App;
