import React, { useEffect, useState } from 'react';

import axios from 'axios';
import GameCard from './GameCard.js';


const ListOfGames = ({ games, userEmail }) => {

    const [parValues, setParValues] = useState([])
    const [email, setEmail] = useState('')

    useEffect(() => {
        setEmail(userEmail);
    },);

    if (!Array.isArray(games)) {
        console.error('Expected games to be an array but received:', games);
        return null; // Return null or a fallback UI if games is not an array
    }

    return (
        <div>
            {games.map((game, index) => (
                <div key={index}>
                    <h4>{game.course} on {new Date(game.datetime).toLocaleDateString()}</h4>
                    <p>Total: {game.total_score}</p>

                    <GameCard game={game}></GameCard>
                </div>
            ))}
        </div>
    );
};

export default ListOfGames;
