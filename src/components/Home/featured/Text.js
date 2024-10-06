import React from 'react';
import { motion } from 'framer-motion';
import { easePolyOut } from 'd3-ease';

const Text = () => {
    const animateNumber = () => (

        <motion.div
            className="featured_number"
            initial={{ opacity: 0, rotateY: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, rotateY: 360, x: 265, y: 170 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{zIndex:100}}
        >
            5
        </motion.div>
    )

    return (
        <div className='featured_text'>
            {animateNumber()}
        </div>
    )
}

export default Text;