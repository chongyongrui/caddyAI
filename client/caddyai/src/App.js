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

  // const getMessages = async() => {
  //   const options = {
  //     method: "POST",
  //     body: JSON.stringify({
  //       message:"hello how are you?"
  //     }),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   }
  //   try {
  //       await fetch('localhost:8000/compeltions', options)
  //       const data = response.json()
  //       console.log(data)
  //   } catch (error){
  //     console.log(error)
  //   }
  // }

  const MY_API_KEY = 'AIzaSyAZdtwG56ao9TXP_xxjAD2c4IkHx6AhQOs'
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(MY_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  async function sendTestPrompt() {
    const prompt = "What is a golf caddie and what is his job scope. How much difference does a good caddie make?"

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const reply = response.text();
    console.log(reply);
  }



  const getMessages = async () => {

    try {
      await sendTestPrompt()
    } catch (error) {
      console.error("Error sending/fetching messages with API:", error);
    }
  };

  return (

    /* /////////////side nav bar/////////////////////// */

    <div className='app'>
      <section className='sidebar'>
        <button>+ New Chat</button>
        <ul className='history'>
          <ul>
            <li>
              example link
            </li>
          </ul>
          <nav>
            <p>Made by Yong Rui</p>
          </nav>
        </ul>
      </section>



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

      {/* ////////////////chat section//////////////////// */}
      <div className='content-body'>
        <section className='main'>
          <div >

            <h1> CaddyGPT </h1>
            <ul className='feed'>

            </ul>

            <div className='bottom-section'>
              <div className='input-container'>
                <input />


                <div id='submit' onClick={getMessages}> Go ⏎ </div>
              </div>
              <p className='info'>
                CaddyGPT is your personal golf caddy to help you shoot lower scores!
              </p>
            </div>



            {/* ////////////////bottom section for future dev//////////////////// */}




            <div >
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
        </section>
      </div>
    </div>
  );
}

export default App;
