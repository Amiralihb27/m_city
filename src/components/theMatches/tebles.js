import React, { useState, useEffect, useReducer, useRef } from 'react';
import { showSuccessToast, showErrorToast } from '../Utils/tools';
import { CircularProgress } from '@mui/material';
import { matchesCollection } from '../../firebase';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { positionsCollection } from '../../firebase';
import { getDocs } from 'firebase/firestore';


const LeagueTable = () => {

    const [positions, setPosition] = useState(null);
    const [loading, setLoading] = useState(false);
    const hasFetched = useRef(false); // Use a ref to keep track of first fetch

    useEffect(() => {
        if (hasFetched.current) return; // Prevent running twice

        const fetchPositions = async () => {
            setLoading(true);
            try {
                const snapshot = await getDocs(positionsCollection);
                const fetchedPositions = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                console.log(fetchedPositions);
                setPosition(fetchedPositions);
                // showSuccessToast('Positions fetched successfully');
            } catch (error) {
                console.error('Error fetching positions:', error);
                showErrorToast("Error while fetching positions");
            } finally {
                setLoading(false);
            }
        };

        fetchPositions();
        hasFetched.current = true; // Mark fetch as done

    }, []); // Empty dependency array to run only once

    const showTeamPosition = () => {
        return (

            positions ?
                positions.map((pos, i) => (
                    <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{pos.team}</TableCell>
                        <TableCell>{pos.w}</TableCell>
                        <TableCell>{pos.l}</TableCell>
                        <TableCell>{pos.d}</TableCell>
                        <TableCell>{pos.p}</TableCell>
                    </TableRow>
                )) :
                null
        )

    }
    return (
        <div className='league_table_wrapper'>
            <div className='title'>
                LeagueTable
            </div>
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Pos</TableCell>
                            <TableCell>Team</TableCell>
                            <TableCell>W</TableCell>
                            <TableCell>L</TableCell>
                            <TableCell>D</TableCell>
                            <TableCell>Pts</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {showTeamPosition()}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default LeagueTable;