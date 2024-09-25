import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import TopNavbar from "../utils/TopNavBar.js";
import "./RoundsPage.css";
import Listofgames from "./ListOfGames.js";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const RoundsPage = ({ email }) => {
  const navigate = useNavigate();

  const [gamesData, setGamesData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const notifyUnsuccessfulPost = (message) => {
    toast.warn(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const fetchUserData = async (userEmail) => {
    try {
      setIsLoading(true);
      const gamesResponse = await axios.get(
        "http://localhost:3001/stats/gamehistory",
        {
          params: { email: userEmail },
        }
      );
      setGamesData(gamesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      notifyUnsuccessfulPost(
        "Error fetching game data. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setUserEmail(localStorage.getItem("email")); 

    axios
      .get("http://localhost:3001/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUserEmail(response.data.email);
        fetchUserData(response.data.email);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        notifyUnsuccessfulPost(
          "Error getting user email. Please try logging in again."
        );
      });
  }, [email, navigate]);

  const handleCourseFilterChange = (course) => {
    setSelectedCourse(course);
  };

  const filteredGames = gamesData.filter(
    (game) => selectedCourse === "All" || game.course === selectedCourse
  );
  const courses = [...new Set(gamesData.map((game) => game.course))];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mainContainer">
      <TopNavbar userEmail={userEmail} />
      <div className="stats-content-body">
        <Container className="mt-4">
          <h1>Stats Page</h1>
          <Row>
            <Col>
              <p>
                Welcome to the Stats page! Here you can view your golf
                statistics and performance data.
              </p>
            </Col>
            <Col>
              <Dropdown onSelect={handleCourseFilterChange}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedCourse}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="All">All Courses</Dropdown.Item>
                  {courses.map((course) => (
                    <Dropdown.Item key={course} eventKey={course}>
                      {course}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <br />
          <br />
          <br />
          <Listofgames games={filteredGames} userEmail={userEmail} />
        </Container>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RoundsPage;
