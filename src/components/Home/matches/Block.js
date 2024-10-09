import React, { useState, useEffect } from 'react';
import { Slide } from 'react-awesome-reveal';
import { getDocs } from 'firebase/firestore';
import { matchesCollection } from '../../../firebase';
import MatchesBlock from '../../Utils/matches_block';
import { CircularProgress } from '@mui/material'; // Import CircularProgress

const Blocks = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        if (matches.length === 0) {
            console.log("Fetching data...");    
            getDocs(matchesCollection)
                .then(snapshot => {
                    const fetchedMatches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setMatches(fetchedMatches);
                    setLoading(false); // Set loading to false once data is fetched
                })
                .catch(error => {
                    console.error("Error fetching matches:", error);
                    setLoading(false); // Set loading to false even if there's an error
                });
        }
    }, [matches]);

    const showMatches = (matches) => {
        if (loading) {
            return (
                <div >
                    <CircularProgress /> {/* CircularProgress for loading */}
                    <div style={{visibility:'hidden'}}>
                        Loading
                    </div>
                </div>
                
            );
        }

        if (matches && matches.length > 0) {
            return matches.map(match => (
                <Slide bottom key={match.id} className='item' triggerOnce>
                    <div>
                        <div className='container'>
                            <MatchesBlock match={match} />
                        </div>
                    </div>
                </Slide>
            ));
        } else {
            return <div>No matches available.</div>; // Show message if no matches
        }
    };

    return (
        <div className='home_matches'>
            {showMatches(matches)}
        </div>
    );
};

export default Blocks;
