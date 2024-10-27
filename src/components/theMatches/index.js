import React, { useState, useEffect, useRef } from 'react';
import { showErrorToast } from '../Utils/tools';
import { CircularProgress } from '@mui/material';
import { matchesCollection, positionsCollection } from '../../firebase';
import { getDocs } from 'firebase/firestore';
import MatchesList from './mathesList';
import LeagueTable from './tebles';

const TheMatches = () => {
    const [matches, setMatches] = useState(null);
    const [positions, setPositions] = useState(null);
    const [loading, setLoading] = useState(false);
    const hasFetched = useRef(false); // Use a ref to keep track of first fetch

    useEffect(() => {
        if (hasFetched.current) return; // Prevent running twice

        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch matches and positions concurrently
                const [matchesSnapshot, positionsSnapshot] = await Promise.all([
                    getDocs(matchesCollection),
                    getDocs(positionsCollection),
                ]);

                // Process matches data
                const fetchedMatches = matchesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMatches(fetchedMatches);

                // Process positions data
                const fetchedPositions = positionsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPositions(fetchedPositions);

            } catch (error) {
                console.error('Error fetching data:', error);
                showErrorToast("Error while fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        hasFetched.current = true; // Mark fetch as done

    }, []); // Empty dependency array to run only once

    if (loading) {
        return (
            <div className='progress'>
                <CircularProgress />
            </div>
        );
    }

    return (
        <>
            {matches && positions ? (
                <div className='the_matches_container'>
                    <div className='the_matches_wrapper'>
                        <div className='left'>
                            <MatchesList matches={matches} />
                        </div>
                        <div className='right'>
                            <LeagueTable positions={positions} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='progress'>
                    <CircularProgress />
                </div>
            )}
        </>
    );
};

export default TheMatches;
