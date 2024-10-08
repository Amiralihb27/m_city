import React, { useState, useEffect } from 'react';
import { Slide } from 'react-awesome-reveal';
import { getDocs } from 'firebase/firestore'; // Import the correct method
import { matchesCollection } from '../../../firebase'; // Ensure this is the correct reference to your collection

const Blocks = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        if (matches.length === 0) {
            console.log(matches.length); 
            // Logging here will still show the old state
            console.log("Matches before fetching data:", matches);
            console.log("Fetching data...");
            getDocs(matchesCollection) // Use getDocs() instead of .get()
                .then(snapshot => { 
                    console.log(snapshot);
                    const fetchedMatches = snapshot.docs.map(doc => ({id:doc.id,...doc.data()}));
                    console.log(fetchedMatches);
                    // Set the matches state
                    setMatches(fetchedMatches);
                    console.log(matches.length);
                    console.log(matches);
                })
                .catch(error => {
                    console.error("Error fetching matches:", error);
                });
        }
    }, [matches]);


    return (
        <div>
            {matches.length}
        </div>
    );
};

export default Blocks;
