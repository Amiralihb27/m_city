// src/components/TheMatches.js
import React, { useState, useEffect, useReducer } from 'react';
import { showErrorToast } from '../Utils/tools';
import { CircularProgress, Box, Typography } from '@mui/material';
import { matchesCollection, positionsCollection } from '../../firebase';
import { getDocs } from 'firebase/firestore';
import MatchesList from './matchesList';
import LeagueTable from './tables';

// Define action types as constants to prevent typos
const SET_FILTER_MATCHES = 'SET_FILTER_MATCHES';
const SET_LAST_CLICKED_FILTER = 'SET_LAST_CLICKED_FILTER';

// Initial state for useReducer
const initialState = {
  filterMatches: [],
  lastClickedFilter: {
    group: 'playedFilter',
    value: 'All',
  },
};

// Reducer function for useReducer
const reducer = (state, action) => {
  switch (action.type) {
    case SET_FILTER_MATCHES:
      return { ...state, filterMatches: action.payload };
    case SET_LAST_CLICKED_FILTER:
      return { ...state, lastClickedFilter: action.payload };
    default:
      return state;
  }
};

const TheMatches = () => {
  const [matches, setMatches] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let isMounted = true; // To handle component unmounting
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

        // Process positions data
        const fetchedPositions = positionsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (isMounted) {
          setMatches(fetchedMatches);
          setPositions(fetchedPositions);
          dispatch({ type: SET_FILTER_MATCHES, payload: fetchedMatches });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        showErrorToast('Error while fetching data');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to set isMounted to false
    return () => {
      isMounted = false;
    };
  }, []); // Runs once on mount

  // Function to filter matches based on 'played' status
  const showPlayed = (played) => {
    let filtered;
    if (played === 'All') {
      filtered = matches;
    } else {
      filtered = matches.filter(match => match.final === played);
    }

    dispatch({ type: SET_LAST_CLICKED_FILTER, payload: { group: 'playedFilter', value: played } });
    dispatch({ type: SET_FILTER_MATCHES, payload: filtered });
  };

  // Function to handle result filters (W, L, D)
  const showResult = (result) => {
    let filtered;
    if (result === 'All') {
      filtered = matches;
    } else {
      filtered = matches.filter(match => match.result === result);
    }

    // Corrected the action type here
    dispatch({ type: SET_LAST_CLICKED_FILTER, payload: { group: 'resultFilter', value: result } });
    dispatch({ type: SET_FILTER_MATCHES, payload: filtered });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {matches.length > 0 && positions.length > 0 ? (
        <div className='the_matches_container'>
          <div className='the_matches_wrapper'>
            <div className='left'>
              <div className='match_filters'>
                {/* Show Matches Filter */}
                <div className='match_filters_box'>
                  <Typography variant="h6" className='tag'>
                    Show Matches
                  </Typography>
                  <div className='cont'>
                    <div
                      className={`option ${state.lastClickedFilter.group === 'playedFilter' && state.lastClickedFilter.value === 'All' ? 'active' : ''}`}
                      onClick={() => showPlayed('All')}
                    >
                      All
                    </div>
                    <div
                      className={`option ${state.lastClickedFilter.group === 'playedFilter' && state.lastClickedFilter.value === 'Yes' ? 'active' : ''}`}
                      onClick={() => showPlayed('Yes')}
                    >
                      Played
                    </div>
                    <div
                      className={`option ${state.lastClickedFilter.group === 'playedFilter' && state.lastClickedFilter.value === 'No' ? 'active' : ''}`}
                      onClick={() => showPlayed('No')}
                    >
                      Not Played
                    </div>
                  </div>
                </div>

                {/* Result Games Filter */}
                <div className='match_filters_box'>
                  <Typography variant="h6" className='tag'>
                    Result Games
                  </Typography>
                  <div className='cont'>
                    <div
                      className={`option ${state.lastClickedFilter.group === 'resultFilter' && state.lastClickedFilter.value === 'All' ? 'active' : ''}`}
                      onClick={() => showResult('All')}
                    >
                      All
                    </div>
                    <div
                      className={`option ${state.lastClickedFilter.group === 'resultFilter' && state.lastClickedFilter.value === 'W' ? 'active' : ''}`}
                      onClick={() => showResult('W')}
                    >
                      W
                    </div>
                    <div
                      className={`option ${state.lastClickedFilter.group === 'resultFilter' && state.lastClickedFilter.value === 'L' ? 'active' : ''}`}
                      onClick={() => showResult('L')}
                    >
                      L
                    </div>
                    <div
                      className={`option ${state.lastClickedFilter.group === 'resultFilter' && state.lastClickedFilter.value === 'D' ? 'active' : ''}`}
                      onClick={() => showResult('D')}
                    >
                      D
                    </div>
                  </div>
                </div>
              </div>
              <MatchesList matches={state.filterMatches} />
            </div>

            <div className='right'>
              <LeagueTable positions={positions} />
            </div>
          </div>
        </div>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default TheMatches;
