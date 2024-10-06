import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { easePolyOut } from 'd3-ease';

const Test = () => {
    const [show, setShow] = useState(true);
    
    return (
        <div>
            <motion.div
                initial={{
                    width: 500,
                    height: 500,
                    opacity: 0,
                    backgroundColor: "#ffffff"
                }}
                animate={{
                    width: show ? 100 : 500,
                    height: show ? 100 : 500,
                    opacity: 1,
                    backgroundColor: "#ffffff"
                }}
                transition={{
                    duration: 1, // 1 second animation
                    delay:1,
                    ease: easePolyOut // Easing function for smooth animation
                }}
            >
                hello
            </motion.div>
            <button onClick={() => setShow(!show)}>Toggle</button>
        </div>
    );
}

export default Test;
