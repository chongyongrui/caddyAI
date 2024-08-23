// src/StatsPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table } from 'react-bootstrap';
import TopNavbar from './topnavbar';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const StatsPage = () => {
    const [userEmail, setUserEmail] = useState('');
    const [statsData, setStatsData] = useState(null);
    const [recentGame, setRecentGame] = useState(null);

    useEffect(() => {
        // Fetch the user's email
        axios.get('http://localhost:3001/auth/me', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setUserEmail(response.data.email);
            return axios.get('http://localhost:3001/stats/stats', {
                params: { email: response.data.email }
            });
        })
        .then(response => {
            setStatsData(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });


    axios.get('http://localhost:3001/stats/recent-game', {
            params: { email: userEmail },
        })
        .then(response => {
            setRecentGame(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.error('Error fetching recent game data:', error);
        });
    }, [userEmail]);

    if (!statsData) {
        return <div>Loading...</div>;
    }

    // Process data
    const fairwayHits = statsData.filter(post => post.fairwayHit);
    const totalFairways = statsData.length;
    const fairwaysHitPercentage = (fairwayHits.length / totalFairways * 100).toFixed(2);

    const greensHits = statsData.filter(post => post.gir);
    const greensHitPercentage = (greensHits.length / totalFairways * 100).toFixed(2);

    const fairwayReasons = statsData.reduce((acc, post) => {
        if (!post.fairwayHit && post.fairwayReason) {
            acc[post.fairwayReason] = (acc[post.fairwayReason] || 0) + 1;
        }
        return acc;
    }, {});

    const girReasons = statsData.reduce((acc, post) => {
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
    };

    const calculateHoleScore = (game) => {
        // Convert boolean values to integers (true -> 1, false -> 0)
        const fairwayHit = game.fairwayHit ? 1 : 0;
        const gir = game.gir ? 1 : 0;
        return (1 - fairwayHit) + (1 - gir) + game.putts - 2 ;
    };
    
    const renderScoreCard = (games) => {
        // Assuming holes are from 1 to 18
        let holes = Array.from({ length: 18 }, (_, index) => index + 1);
        let scores = holes.map(hole => {
            // Find the game data for each hole
            const game = games.find(g => g.hole === hole);
            return {
                hole,
                score: game ? calculateHoleScore(game) : 0
            };
        });

        // Split scores into two rows of 9 holes each
        let row1 = scores.slice(0, 9).map(score => score.hole);
        let row2 = scores.slice(0, 9).map(score => score.score);
        let row3 = scores.slice(9, 18).map(score => score.hole);
        let row4 = scores.slice(9, 18).map(score => score.score);

        return (
            <Table bordered>
                <thead>
                    <tr>
                        {row1.map(hole => (
                            <th key={hole}>Hole {hole}</th>
                        ))}
                    </tr>
                    <tr>
                        {row2.map((score, index) => (
                            <td key={index}>{score}</td>
                        ))}
                    </tr>
                    <tr>
                        {row3.map(hole => (
                            <th key={hole}>Hole {hole}</th>
                        ))}
                    </tr>
                    <tr>
                        {row4.map((score, index) => (
                            <td key={index}>{score}</td>
                        ))}
                    </tr>
                </thead>
            </Table>
        );
    };

    return (
        <div className="mainContainer">
            <TopNavbar userEmail={userEmail} />
            <div className='content-body'>
                <Container className="mt-4">
                    <h1>Stats Page</h1>
                    <p>Welcome to the Stats page! Here you can view your golf statistics and performance data.</p>
                    <br/><br/><br/>
                    <Row>
                        <Col>
                            <h4>Average Putts Per Hole</h4>
                            {/* Calculate average putts per hole */}
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
                    <br/><br/><br/>
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
                    <br/><br/><br/>
                    <Row>
                    {recentGame ? (
                        <div>
                            <h4>Most Recent Game</h4>
                            {renderScoreCard(recentGame)}
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
