import React from 'react';
import { motion } from 'framer-motion';
import { easePolyOut } from 'd3-ease';
import FeaturedPlayer from '../../../Resources/images/featured_player.png';

const Text = () => {
    const animateFirstText = () => (
        <motion.div
            className="featured_first"
            initial={{ opacity: 0, x: 503, y: 420 }}
            animate={{ opacity: 1, x: 267, y: 420 }}
            transition={{ duration: 1, ease: easePolyOut }}
            style={{ zIndex: 100 }}
        >
            LEAGUE
        </motion.div>

    )

    const animateSecondText = () => (
        <motion.div
            className="featured_second"
            initial={{ opacity: 0, x: 503, y: 550 }}
            animate={{ opacity: 1, x: 267, y: 550 }}
            transition={{ delay: 0.3, duration: 1, ease: easePolyOut }}
            style={{ zIndex: 100 }}
        >
            ChampioShip
        </motion.div>
    )

    const animatePlayer = () => (
        <motion.div
            className="featured_player"
            initial={{ opacity: 0,x: 503, y: 550 }}
            animate={{ opacity: 1 , x: 550, y: 150}}
            transition={{ delay: 0.6, duration: 1, ease: easePolyOut }}
            style={{ zIndex: 95 ,background:`url(${FeaturedPlayer}) no-repeat`}}
        />
        
    )
    const animateNumber = () => (

        <motion.div
            className="featured_number"
            initial={{ opacity: 0, rotateY: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, rotateY: 360, x: 255, y: 130 }}
            transition={{ duration: 1, ease: easePolyOut }}
            style={{ zIndex: 100 }}
        >
            5
        </motion.div>
    )



    return (
        <div className='featured_text'>

            {animatePlayer()}
            {animateNumber()}
            {animateFirstText()}
            {animateSecondText()}
        </div>
    )
}

export default Text;