import React from 'react';
import { motion } from 'framer-motion';

const stripesState = [
    {
        id: 1292751,
        background: '#98c5e9',
        left: 150,
        rotate: 25,
        top: -100,
        delay: 0
    },
    {
        id: 20392323,
        background: '#ffffff',
        left: 440,
        rotate: 25,
        top: -150,
        delay: 0.3 // in seconds for Framer Motion
    },
    {
        id: 2018261,
        background: '#98c5e9',
        left: 730,
        rotate: 25,
        top: -200,
        delay: 0.6 // in seconds for Framer Motion
    }
];

const Stripes = () => {
    const handleShowStripe = () =>
        stripesState.map((stripe) => (
            <motion.div
                key={stripe.id}
                className="stripe"
                initial={{
                    opacity: 0,
                    x: 0, // Horizontal translation (left)
                    y: 0, // Vertical translation (top)
                    rotate: 0,
                }}
                animate={{
                    backgroundColor: stripe.background,
                    opacity: 1,
                    x: stripe.left,
                    y: stripe.top,
                    rotate: stripe.rotate,
                    transition: {
                        delay: stripe.delay, // Delay for each stripe animation
                        duration: 0.5, // Animation duration in seconds
                        ease: [0.77, 0, 0.18, 1], // Easing function similar to easePolyOut
                    },
                }}
                style={{
                    background: stripe.background,
                }}
            />
        ));

    return <div className="featured_stripes">{handleShowStripe()}</div>;
};

export default Stripes;
