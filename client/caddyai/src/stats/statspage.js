import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import TopNavbar from '../utils/TopNavBar';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './StatsPage.css';
import renderScoreCard from './ScoreCard';
import { useNavigate } from 'react-router-dom';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const StatsPage = ({ email }) => {
    const [userEmail, setUserEmail] = useState('');
    const [statsData, setStatsData] = useState(null);
    const [recentGame, setRecentGame] = useState(null);
    const [courseName, setCourseName] = useState('');
    const [parValues, setParValues] = useState([]);
    const [viewMode, setViewMode] = useState('all'); // New state for toggle
    const navigate = useNavigate();

    const fetchParValues = async (courseName) => {
        try {
            const response = await axios.get('http://localhost:3001/courses/coursesearch', {
                params: { name: courseName }
            });

            const parValues = [
                response.data.hole1_par, response.data.hole2_par, response.data.hole3_par, response.data.hole4_par, response.data.hole5_par,
                response.data.hole6_par, response.data.hole7_par, response.data.hole8_par, response.data.hole9_par, response.data.hole10_par,
                response.data.hole11_par, response.data.hole12_par, response.data.hole13_par, response.data.hole14_par, response.data.hole15_par,
                response.data.hole16_par, response.data.hole17_par, response.data.hole18_par
            ];

            return { parValues };
        } catch (error) {
            console.error('Error fetching course data:', error);
            return null;
        }
    };

    useEffect(() => {
        if (!email) {
            navigate('/login');
        }

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

                // Fetch the stats data
                const statsResponse = await axios.get('http://localhost:3001/stats/stats', {
                    params: { email }
                });
                setStatsData(statsResponse.data);

                // Fetch the recent game data
                const recentGameResponse = await axios.get('http://localhost:3001/stats/recent-game', {
                    params: { email }
                });

                const recentGameData = recentGameResponse.data;
                setRecentGame(recentGameData);
                if (recentGameData.length > 0) {
                    const courseName = recentGameData[0].course;
                    setCourseName(courseName);

                    // Fetch par values based on the course name
                    const response = await axios.get('http://localhost:3001/courses/coursesearch', {
                        params: { name: courseName }
                    });

                    const fetchedParValues = [
                        response.data.hole1_par, response.data.hole2_par, response.data.hole3_par, response.data.hole4_par, response.data.hole5_par,
                        response.data.hole6_par, response.data.hole7_par, response.data.hole8_par, response.data.hole9_par, response.data.hole10_par,
                        response.data.hole11_par, response.data.hole12_par, response.data.hole13_par, response.data.hole14_par, response.data.hole15_par,
                        response.data.hole16_par, response.data.hole17_par, response.data.hole18_par
                    ];
                    setParValues(fetchedParValues);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUserData();
    }, []);

    if (!statsData) {
        return <div>Loading...</div>;
    }

    // Filter data based on the viewMode
    const displayedStats = viewMode === 'latest' && recentGame ? recentGame : statsData;
    const totalFairways = displayedStats.length;

    // Process data
    const fairwayHits = displayedStats.filter(post => post.fairwayHit);
    const fairwaysHitPercentage = (fairwayHits.length / totalFairways * 100).toFixed(2);

    const greensHits = displayedStats.filter(post => post.gir);
    const greensHitPercentage = (greensHits.length / totalFairways * 100).toFixed(2);

    const fairwayReasons = displayedStats.reduce((acc, post) => {
        if (!post.fairwayHit && post.fairwayReason) {
            acc[post.fairwayReason] = (acc[post.fairwayReason] || 0) + 1;
        }
        return acc;
    }, {});

    const girReasons = displayedStats.reduce((acc, post) => {
        if (!post.gir && post.girReason) {
            acc[post.girReason] = (acc[post.girReason] || 0) + 1;
        }
        return acc;
    }, {});

    // Chart data
    const fairwayReasonsData = {
        labels: Object.keys(fairwayReasons),
        datasets: [{
            label: 'count',
            data: Object.values(fairwayReasons),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        }],
    };

    const girReasonsData = {
        labels: Object.keys(girReasons),
        datasets: [{
            label: "count",
            data: Object.values(girReasons),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }],
    }

    return (
        <div className="mainContainer">
            <TopNavbar userEmail={userEmail} />
            <div className='stats-content-body'>
                <Container className="mt-4">
                    <h1>Stats Page</h1>
                    <Row>
                        <Col><p>Welcome to the Stats page! Here you can view your golf statistics and performance data.</p>
                        </Col>
                        <Col className="text-center">
                            <ToggleButtonGroup
                                type="radio"
                                name="viewMode"
                                value={viewMode}
                                onChange={val => setViewMode(val)}
                            >
                                <ToggleButton id="tbg-radio-1" value="all" className="greyscale-btn">
                                    All Games
                                </ToggleButton>
                                <ToggleButton id="tbg-radio-2" value="latest" className="greyscale-btn">
                                    Latest Game
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Col>
                    </Row>

                    <br /><br /><br />
                    <Row>
                        <Col>
                            <h4>Average Putts Per Hole</h4>
                            <h2>{(statsData.reduce((sum, post) => sum + post.putts, 0) / totalFairways).toFixed(2)}</h2>
                        </Col>
                        <Col>
                            <h4>Fairways Hit</h4>
                            <h2>{fairwaysHitPercentage}%</h2>
                        </Col>
                        <Col>
                            <h4>Greens in Regulation</h4>
                            <h2>{greensHitPercentage}%</h2>
                        </Col>
                    </Row>
                    <br /><br /><br />
                    <Row>
                        <Col>
                            <h3>Fairway Misses</h3>
                            <Bar data={fairwayReasonsData} options={{ responsive: true }} />
                        </Col>
                        <Col>
                            <h3>GIR Misses</h3>
                            <Bar data={girReasonsData} options={{ responsive: true }} />
                        </Col>
                    </Row>
                    <br /><br /><br />
                    <Row>
                        {recentGame ? (
                            <div>
                                <h4>Most Recent Game - {courseName}</h4>
                                {renderScoreCard(recentGame, parValues)}
                                <br></br>
                            </div>
                        ) : (
                            <p>Loading recent game data...</p>
                        )}
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default StatsPage;
