// src/components/MatchesList.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MatchesList = ({ matches }) => {
  // Define animation variants for the match boxes
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05, // Set the stagger delay to 500ms for noticeable delay
      },
    },
  };

  const matchBoxVariants = {
    hidden: { opacity: 0, x: -200 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      x: -200,
      transition: {
        duration: 0.5,
        ease: 'easeIn',
      },
    },
  };

  return (
    <div>
      <AnimatePresence>
        {matches && matches.length > 0 && (
          <motion.div
            className="matches_list_wrapper"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {matches.map((match) => (
              <motion.div
                key={match.id}
                className="match_box_big"
                variants={matchBoxVariants}
                layout
              >
                <div className="block_wraper">
                  <div className="block">
                    <div
                      className="icon"
                      style={{
                        background: `url(/images/team_icons/${match.localThmb}.png) no-repeat center center`,
                        backgroundSize: 'cover',
                      }}
                    ></div>
                    <div className="team">{match.local}</div>
                    <div className="result">{match.resultLocal}</div>
                  </div>
                  <div className="block">
                    <div
                      className="icon"
                      style={{
                        background: `url(/images/team_icons/${match.awayThmb}.png) no-repeat center center`,
                        backgroundSize: 'cover',
                      }}
                    ></div>
                    <div className="team">{match.away}</div>
                    <div className="result">{match.resultAway}</div>
                  </div>
                </div>
                <div className="block_wraper nfo">
                  <div>
                    <strong>Date:</strong> {match.date}
                  </div>
                  <div>
                    <strong>Stadium:</strong> {match.stadium}
                  </div>
                  <div>
                    <strong>Referee:</strong> {match.referee}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MatchesList;
