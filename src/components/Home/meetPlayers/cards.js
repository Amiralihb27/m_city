import React from 'react';
import { motion } from 'framer-motion'; // Import framer-motion
import Otamendi from '../../../Resources/images/players/Otamendi.png';
import Sterling from '../../../Resources/images/players/Raheem_Sterling.png';
import Kompany from '../../../Resources/images/players/Vincent_Kompany.png';
import PlayerCard from '../../Utils/playerCard';

let cards = [
    {
        bottom: 90,
        left: 300,
        player: Kompany
    },
    {
        bottom: 60,
        left: 200,
        player: Sterling
    },
    {
        bottom: 30,
        left: 100,
        player: Otamendi
    },
    {
        bottom: 0,
        left: 0,
        player: Kompany
    }
];

const HomeCards = (props) => {

    const showAnimateCards = () => (
        cards.map((card, i) => (
            <motion.div
                key={i}
                initial={{ left: 0, bottom: 0 }} // Start position
                animate={{ left: card.left, bottom: card.bottom }} // Target position
                transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }} // Animation config
                style={{ position: 'absolute' }} // Maintain absolute positioning
            >
                <PlayerCard
                    number="30"
                    name="Nicolas"
                    lastname="Otamendi"
                    bck={card.player}
                />
            </motion.div>
        ))
    );

    return (
        <div>
            {showAnimateCards()}
        </div>
    );
};

export default HomeCards;
