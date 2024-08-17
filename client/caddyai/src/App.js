import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

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
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
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

      <div className="main-content">
        <div className="content-body">
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
      </div>
    </div>
  );
}

export default App;
