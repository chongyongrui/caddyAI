import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import './GameCard.css';

const GameCard = ({ game }) => {
    const [parValues, setParValues] = useState([]);

    useEffect(() => {
        const fetchParValues = async () => {
            try {
                const response = await axios.get('http://localhost:3001/courses/coursesearch', {
                    params: { name: game.course }
                });

                const parValues = [
                    response.data.hole1_par, response.data.hole2_par, response.data.hole3_par, response.data.hole4_par, response.data.hole5_par,
                    response.data.hole6_par, response.data.hole7_par, response.data.hole8_par, response.data.hole9_par, response.data.hole10_par,
                    response.data.hole11_par, response.data.hole12_par, response.data.hole13_par, response.data.hole14_par, response.data.hole15_par,
                    response.data.hole16_par, response.data.hole17_par, response.data.hole18_par
                ];

                setParValues(parValues);
            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };

        fetchParValues();
    }, [game.course]);

    if (parValues.length === 0) {
        return <div>Loading...</div>;  // Optionally show a loading message while fetching data
    }

    const holes = Array.from({ length: 18 }, (_, index) => index + 1);
    const jsonObject = JSON.parse(game.scores);
    const scorearray = Object.values(jsonObject);

    const scores = holes.map(hole => ({
        hole,
        score: scorearray[hole - 1],  // Fetch the score for each hole from game.scores
        par: parValues[hole - 1]
    }));

    const row1 = scores.slice(0, 9).map(score => score.hole);
    const row2 = scores.slice(0, 9).map(score => score.par);
    const row3 = scores.slice(0, 9).map(score => score.score);
    const row4 = scores.slice(9, 18).map(score => score.hole);
    const row5 = scores.slice(9, 18).map(score => score.par);
    const row6 = scores.slice(9, 18).map(score => score.score);

    const getStyleForScore = (score, par) => {
        if (score <= par - 1) {
            return { backgroundColor: 'lightgreen', color: 'white' };
        } else if (score === par) {
            return { backgroundColor: 'white', color: 'black' };
        } else if (score === par + 1) {
            return { backgroundColor: 'mistyRose', color: 'black' };
        } else if (score > par + 1) {
            return { backgroundColor: 'lightpink', color: 'black' };
        }
        return {};
    };

    // Calculate total scores for each set of 9 holes
    const totalScore1 = row3.reduce((acc, score) => acc + score, 0);
    const totalScore2 = row6.reduce((acc, score) => acc + score, 0);

    return (
        <Table bordered className="scorecard-table">
            <thead>
                <tr>
                    <th style={{ backgroundColor: 'lightgrey' }}></th>
                    {row1.map(hole => (
                        <th key={hole} style={{ textAlign: 'center', backgroundColor: 'lightgrey' }}>Hole {hole}</th>
                    ))}
                    <th style={{ textAlign: 'center', backgroundColor: 'Azure', color: 'black' }}>Total Score</th>
                </tr>
                <tr>
                    <th>Par</th>
                    {row2.map((par, index) => (
                        <td key={index} style={{ textAlign: 'center' }}>{par}</td>
                    ))}
                    <td style={{ textAlign: 'center', backgroundColor: 'Azure', color: 'black' }}>Front</td>
                </tr>
                <tr>
                    <th>Score</th>
                    {row3.map((score, index) => (
                        <td key={index} style={getStyleForScore(score, row2[index])}>{score}</td>
                    ))}
                    <td style={{ textAlign: 'center', backgroundColor: 'Azure', color: 'black' }}>{totalScore1}</td>
                </tr>
                <tr>
                    <th style={{ backgroundColor: 'lightgrey' }}></th>
                    {row4.map(hole => (
                        <th key={hole} style={{ textAlign: 'center', backgroundColor: 'lightgrey' }}>Hole {hole}</th>
                    ))}
                    <th style={{ textAlign: 'center', backgroundColor: 'Azure', color: 'black' }}>Back</th>
                </tr>
                <tr>
                    <th>Par</th>
                    {row5.map((par, index) => (
                        <td key={index} style={{ textAlign: 'center' }}>{par}</td>
                    ))}
                    <td style={{ textAlign: 'center', backgroundColor: 'Azure', color: 'black' }}>{totalScore2}</td>
                </tr>
                <tr>
                    <th>Score</th>
                    {row6.map((score, index) => (
                        <td key={index} style={getStyleForScore(score, row5[index])}>{score}</td>
                    ))}
                    <td style={{ textAlign: 'center', backgroundColor: 'Azure', color: 'black' }}>Total: {totalScore1 + totalScore2}</td>
                </tr>
            </thead>
        </Table>
    );
};

export default GameCard;
