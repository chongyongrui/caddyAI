import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import './Login.css';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showSignupModal, setShowSignupModal] = useState(false);

  const navigate = useNavigate();

  const onButtonClick = async () => {
    setEmailError('');
    setPasswordError('');
    setLoginError('');

    if (email === '') {
      setEmailError('Please enter your email');
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if (password === '') {
      setPasswordError('Please enter a password');
      return;
    }

    if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userEmail',email);
      props.setLoggedIn(true);
      props.setEmail(email);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 400) {
        setShowSignupModal(true);
      } else {
        setLoginError(error.response?.data?.message || 'Login failed. Please try again.');
      }
    }
  };


  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/signup', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      setShowSignupModal(false);
      navigate('/');
    } catch (error) {
      setLoginError(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (


    <div className="login-container">
      <h1 className="login-title">CaddyAI</h1>

      <div className="login-box">
        <div className="titleContainer">
          <div>Login</div>
        </div>
        <br />
        <div className="inputContainer">
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            className="inputBox"
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className="inputContainer">
          <input
            type="password"
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className="inputBox"
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className="inputContainer">
          <input className="inputButton" type="button" onClick={onButtonClick} value="Log in" />
        </div>
        <label className="errorLabel">{loginError}</label>

        <Modal show={showSignupModal} onHide={() => setShowSignupModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>User Not Found</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This email is not registered. Would you like to create an account with this email?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSignupModal(false)}>
              No
            </Button>
            <Button variant="primary" onClick={handleSignup}>
              Yes, Sign Up
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Login;
