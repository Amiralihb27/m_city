import React from 'react';
import { Slide } from 'react-awesome-reveal';
import PlayerCard from '../Utils/playerCard';

const CardsByPosition = ({ position, players }) => {

    const showPlayerByCategory = (category) => {
        const filteredPlayers = players.filter((player) => player.position === category);
        return (
            filteredPlayers.map((player) => (
                <div className='team_cards' key={player.id}>
                    <div className='item'>
                        <Slide triggerOnce>
                            <PlayerCard
                                image={player.image}
                                number={player.number}
                                name={player.name}
                                lastname={player.lastname}
                            />
                        </Slide>
                    </div>
                </div>
            ))
        );
    };

    return (
        <div className='team_category_wrapper'>
            <div className='title'>
                {position}
            </div>
            <div className='team_cards'>
                {showPlayerByCategory(position)}
            </div>
        </div>
    );
};

export default CardsByPosition;
