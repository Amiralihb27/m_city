import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { easePolyOut } from 'd3-ease';
const Test = () => {
    const [show, setShow] = useState(true);
    const [bck, setBck] = useState('#ffffff');

    return (
        <>
            <button
                onClick={() => {
                    setBck('#f44336');
                }}
            >
                Update
            </button>
            <button
                onClick={() => {
                    setShow(false);
                }}
            >
                Remove
            </button>
            <button
                onClick={() => {
                    setShow(true);
                    setBck('#fff');
                }}
            >
                Show
            </button>

            <AnimatePresence>
                {show && (
                    <motion.div
                        // Enter animation (similar to 'enter' in react-move)
                        initial={{
                            backgroundColor: bck,
                            width: 500,
                            height: 500,
                            opacity: 0,
                        }}
                        animate={{
                            backgroundColor: bck,
                            width: 100,
                            height: 100,
                            opacity: 1,
                            transition: {
                                duration: 1, // 1000ms duration
                                delay: 1, // 1000ms delay
                                ease: easePolyOut, // easePolyOut equivalent
                            },
                        }}
                        // Update animation (similar to 'update' in react-move)
                        whileHover={{
                            opacity: 0.5,
                            transition: {
                                duration: 2, // 2000ms duration for update
                                ease: easePolyOut,
                            },
                        }}
                        // Leave animation (similar to 'leave' in react-move)
                        exit={{
                            width: 1000,
                            opacity: 0,
                            transition: [
                                {
                                    width: { duration: 0.5, ease: easePolyOut }, // First leave transition
                                },
                                {
                                    opacity: {
                                        delay: 2, // 2000ms delay for opacity transition
                                        duration: 0.5, // 500ms duration
                                        ease: easePolyOut,
                                    },
                                },
                            ],
                        }}
                        // onAnimationStart={() => {
                        //     console.log('STARTED');
                        // }}
                        // onAnimationComplete={() => {
                        //     console.log('ENDED');
                        // }}
                    >
                        hello
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Test;
