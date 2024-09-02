import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import TopNavbar from '../utils/topnavbar';
import './roundspage.css';
import renderScoreCard from '../stats/scorecard';

const RoundsPage = () => {
    const [userEmail, setUserEmail] = useState('');
    const [gamesData, setGamesData] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('All'); // Filter by course
    const [parValuesCache, setParValuesCache] = useState({}); // Cache for par values to avoid redundant API calls

    const fetchParValues = async (courseName) => {
        try {
            if (parValuesCache[courseName]) {
                return parValuesCache[courseName];
            }

            const response = await axios.get('http://localhost:3001/courses/coursesearch', {
                params: { name: courseName }
            });

            const fetchedParValues = [
                response.data.hole1_par, response.data.hole2_par, response.data.hole3_par, response.data.hole4_par, response.data.hole5_par,
                response.data.hole6_par, response.data.hole7_par, response.data.hole8_par, response.data.hole9_par, response.data.hole10_par,
                response.data.hole11_par, response.data.hole12_par, response.data.hole13_par, response.data.hole14_par, response.data.hole15_par,
                response.data.hole16_par, response.data.hole17_par, response.data.hole18_par
            ];

            setParValuesCache(prevCache => ({
                ...prevCache,
                [courseName]: fetchedParValues
            }));

            return fetchedParValues;
        } catch (error) {
            console.error('Error fetching par values:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch the user's email
                const userResponse = await axios.get('http://localhost:3001/auth/me', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const email = userResponse.data.email;
                setUserEmail(email);

                // Fetch all games data
                const gamesResponse = await axios.get('http://localhost:3001/stats/gamehistory', {
                    params: { email }
                });
                setGamesData(gamesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleCourseFilterChange = (course) => {
        setSelectedCourse(course);
    };

    // Filter games based on selected course
    //const filteredGames = gamesData.filter(game => selectedCourse === 'All' || game.course === selectedCourse);
    //const courses = [...new Set(gamesData.map(game => game.course))]; // Get unique courses

    return (
        <div className="mainContainer">
            <TopNavbar userEmail={userEmail} />
            <div className='stats-content-body'>
                <Container className="mt-4">
                    <h1>Stats Page</h1>
                    <Row>
                        <Col>
                            <p>Welcome to the Stats page! Here you can view your golf statistics and performance data.</p>
                        </Col>

                        <Col>
                            <Dropdown onSelect={handleCourseFilterChange}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {selectedCourse}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="All">All Courses</Dropdown.Item>
                                    {courses.map(course => (
                                        <Dropdown.Item key={course} eventKey={course}>{course}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <br /><br /><br />
                    {filteredGames.map((game, index) => (
                        <div key={index}>
                            <h4>{game.course} on {new Date(game.dateTime).toLocaleDateString()}</h4>
                            <GameScoreCard game={game} fetchParValues={fetchParValues} />
                            <br />
                        </div>
                    ))}
                </Container>
            </div>
        </div>
    );
};

const GameScoreCard = ({ game, fetchParValues }) => {
    const [parValues, setParValues] = useState([]);

    useEffect(() => {
        const fetchAndSetParValues = async () => {
            const fetchedParValues = await fetchParValues(game.course);
            setParValues(fetchedParValues);
        };

        fetchAndSetParValues();
    }, [game.course, fetchParValues]);

    return renderScoreCard(game, parValues);
};

export default RoundsPage;
