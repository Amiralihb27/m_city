import React, { useState, useEffect, useRef } from 'react';
import { showSuccessToast, showErrorToast } from '../Utils/tools';
import { CircularProgress } from '@mui/material';
import { matchesCollection } from '../../firebase';
import { getDocs } from 'firebase/firestore';
import MatchesList from './mathesList';
import LeagueTable from './tebles';

const TheMatches = () => {
    const [matches, setMatches] = useState(null);
    const [loading, setLoading] = useState(false);
    const hasFetched = useRef(false); // Use a ref to keep track of first fetch

    useEffect(() => {
        if (hasFetched.current) return; // Prevent running twice

        const fetchMatches = async () => {
            setLoading(true);
            try {
                const snapshot = await getDocs(matchesCollection);
                const fetchedMatches = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                console.log(fetchedMatches);
                setMatches(fetchedMatches);
                // showSuccessToast('Matches fetched successfully');
            } catch (error) {
                console.error('Error fetching matches:', error);
                showErrorToast("Error while fetching matches");
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
        hasFetched.current = true; // Mark fetch as done

    }, []); // Empty dependency array to run only once

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <>
            {matches ?
                <div className='the_matches_container'>
                    <div className='the_matches_wrapper'>
                        <div className='left'>
                            <MatchesList />
                        </div>
                        <div className='right'>
                            <LeagueTable />
                        </div>
                    </div>
                </div> :
                <div className='progress'>
                    <CircularProgress />
                </div>}
        </>
    );
}

export default TheMatches;
