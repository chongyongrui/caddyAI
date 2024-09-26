import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './landingpage/LandingPage.js'
import StatsPage from './stats/StatsPage.js';
import Login from './utils/Login.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import RoundsPage from './rounds/RoundsPage.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');
    
    if (token) {
      setLoggedIn(true); 
      setEmail(storedEmail); 
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LandingPage email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          <Route
            path="/stats"
            element={loggedIn ? <StatsPage email={email} /> : <Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          <Route
            path="/rounds"
            element={loggedIn ? <RoundsPage email={email} /> : <Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
