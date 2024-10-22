import React from 'react';
import { motion } from 'framer-motion'; // Import framer-motion
import Otamendi from '../../../Resources/images/players/Otamendi.png';
import Sterling from '../../../Resources/images/players/Raheem_Sterling.png';
import Kompany from '../../../Resources/images/players/Vincent_Kompany.png';
import PlayerCard from '../../Utils/playerCard';
import { cityDB } from '../../../temp/m-city-export';

let cards = [
    {
        bottom: 90,
        left: 300,
         playerImg: Sterling,
        playerName: 'Raheem'
    },
    {
        bottom: 60,
        left: 200,
        playerImg: Otamendi,
        playerName: 'Nicolas'
    },
    {
        bottom: 30,
        left: 100,
          playerImg: Kompany,
        playerName: 'Vincent'
    },
    {
        bottom: 0,
        left: 0,
        playerImg: Otamendi,
        playerName: 'Nicolas'
    }
];

const HomeCards = (props) => {

    const showAnimateCards = () => (
        cards.map((card, i) => {
            const foundPlayer = findPlayer(card.playerName);
            // console.log(foundPlayer);
            return (

                <motion.div
                    key={i}
                    initial={{ left: 0, bottom: 0 }} // Start position
                    animate={{ left: card.left, bottom: card.bottom }} // Target position
                    transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }} // Animation config
                    style={{ position: 'absolute' }} // Maintain absolute positioning
                >

                    <PlayerCard
                        image={card.playerImg}
                        number={foundPlayer.number}
                        name={foundPlayer.name}
                        lastname={foundPlayer.lastname}
                    />
                </motion.div>
            )
        })
    );

    const findPlayer = (playerName) => {
        // console.log(playerName);
        return cityDB.players.find((player) => {
            if (playerName.toLowerCase() === player.name.toLowerCase()) {
                // console.log(player);
                // console.log("found");
                return true; // This will cause `find` to return the matched player
            }
            return false;
        });
    }

    return (
        <div>
            {showAnimateCards()}
        </div>
    );
};

export default HomeCards;
