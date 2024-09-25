import React from 'react';
import { Table } from 'react-bootstrap';
import './scorecard.css';

const calculateHoleScore = (game, parValue) => {
    const fairwayHit = game.fairwayHit ? 1 : 0;
    const gir = game.gir ? 1 : 0;
    return (1 - fairwayHit) + (1 - gir) + game.putts - 2 + parValue;
};

const RenderScoreCard = (games, parValues) => {
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
                <tr >
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

export default RenderScoreCard;
