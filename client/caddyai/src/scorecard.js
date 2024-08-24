import React from 'react';
import { Table } from 'react-bootstrap';
import './scorecard.css'

const calculateHoleScore = (game, parValue) => {
    // Convert boolean values to integers (true -> 1, false -> 0)
    const fairwayHit = game.fairwayHit ? 1 : 0;
    const gir = game.gir ? 1 : 0;
    return (1 - fairwayHit) + (1 - gir) + game.putts - 2 + parValue;
};


const renderScoreCard = (games, parValues) => {
    let holes = Array.from({ length: 18 }, (_, index) => index + 1);
    let scores = holes.map(hole => {
        const game = games.find(g => g.hole === hole);
        return {
            hole,
            score: game ? calculateHoleScore(game, parValues[hole - 1]) : 0,
            par: parValues[hole - 1]
        };
    });

    let row1 = scores.slice(0, 9).map(score => score.hole);
    let row2 = scores.slice(0, 9).map(score => score.par);
    let row3 = scores.slice(0, 9).map(score => score.score);
    let row4 = scores.slice(9, 18).map(score => score.hole);
    let row5 = scores.slice(9, 18).map(score => score.par);
    let row6 = scores.slice(9, 18).map(score => score.score);

    const getStyleForScore = (score, par) => {
        if (score === par - 1) {
            return { backgroundColor: 'green', color: 'white' };
        } else if (score === par) {
            return { backgroundColor: 'white', color: 'black' };
        } else if (score === par + 1) {
            return { backgroundColor: 'lightpink', color: 'black' };
        } else if (score > par + 1) {
            return { backgroundColor: 'red', color: 'white' };
        }
        return {};
    };

    return (
        <Table bordered className="scorecard-table">
            <thead>
                <tr>
                    <th></th>
                    {row1.map(hole => (
                        <th key={hole} style={{ textAlign: 'center' }}>Hole {hole}</th>
                    ))}
                </tr>
                <tr>
                    <th>Par</th>
                    {row2.map((par, index) => (
                        <td key={index} style={{ textAlign: 'center' }}>{par}</td>
                    ))}
                </tr>
                <tr>
                    <th>Score</th>
                    {row3.map((score, index) => (
                        <td key={index} style={getStyleForScore(score, row2[index])}>{score}</td>
                    ))}
                </tr>
                <tr>
                    <th></th>
                    {row4.map(hole => (
                        <th key={hole} style={{ textAlign: 'center' }}>Hole {hole}</th>
                    ))}
                </tr>
                <tr>
                    <th>Par</th>
                    {row5.map((par, index) => (
                        <td key={index} style={{ textAlign: 'center' }}>{par}</td>
                    ))}
                </tr>
                <tr>
                    <th>Score</th>
                    {row6.map((score, index) => (
                        <td key={index} style={getStyleForScore(score, row5[index])}>{score}</td>
                    ))}
                </tr>
            </thead>
        </Table>
    );
};


export default renderScoreCard;
