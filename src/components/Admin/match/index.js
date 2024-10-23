import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { matchesCollection } from '../../../firebase';
import { getDocs, query, limit, startAfter } from "firebase/firestore";
import { Button } from "@mui/material";
import { showErrorToast } from "../../Utils/tools"; import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { CircularProgress } from "@mui/material";


const AdminMatches = () => {
    const [matches, setMatches] = useState(null);
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                if (!matches) {
                    setLoading(true);
                    const q = query(matchesCollection, limit(2)); // Use query for limits
                    const snapshot = await getDocs(q); // Use getDocs to fetch data
                    const matchesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    // console.log(playersData)
                    setMatches(matchesData);
                    const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
                    setLastVisible(lastVisibleDoc);
                    // console.log(lastVisibleDoc);
                }
            } catch (error) {
                console.error("Error fetching matches:", error);
                showErrorToast(error)
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, [matches]);

    const loadMorePlayer = async () => {
        try {
            if (lastVisible) {
                setLoading(false);
                const q = query(matchesCollection, limit(2), startAfter(lastVisible)); // Use query for limits
                const snapshot = await getDocs(q); // Use getDocs to fetch data
                const newMatchData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setMatches([...matches, ...newMatchData]);
                const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
                setLastVisible(lastVisibleDoc);
                console.log(matches)
            }
            else {
                console.log('no more match to load')
                showErrorToast('no more match to load')
            }
        } catch (error) {
            console.log('Error loading more  matches:', error)
            showErrorToast(error)
        }
    }
    return (

        <AdminLayout title="The Matches">
            <div className='mb-5'>
                <Button
                    variant="contained"
                    style={{ backgroundColor: '#67D7DB' }}
                    component={Link}
                    to='/admin_matches/add_match'
                >
                    Add Matches
                </Button>
            </div>
            {matches && matches.length > 0 ? (
                <Paper className="mb-5">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell >Match</TableCell>
                                <TableCell >Result</TableCell>
                                <TableCell >Final</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {matches.map((match) => (
                    
                                <TableRow
                                    key={match.id} // Use a unique identifier for the key
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell >
                                        {match.date}
                                    </TableCell>
                                    <TableCell >
                                        <Link to={`/admin_matches/edit_match/${match.id}`}>
                                        {match.away} <strong>-</strong> {match.local}
                                        </Link>
                                    </TableCell>
                                    <TableCell >
                                        {match.resultAway} <strong>-</strong> {match.resultLocal}
                                    </TableCell>
                                    <TableCell >
                                        {match.final === 'Yes' ?
                                        <span className="matches_tag_red">Final</span>
                                        :
                                        <span className="matches_tag_green">Not played yet</span>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            ) : (
                <p>No players available.</p> // Optional: Message for no players
            )}
            <Button
                variant="contained"
                // color='primary'
                onClick={loadMorePlayer}
                disabled={loading}
                style={{
                    backgroundColor: '#67B2DB'
                }}>
                Load more
            </Button>
            <div className="admin_progress">
                {loading ? <CircularProgress thickness={5} ></CircularProgress> : null}
            </div>
        </AdminLayout>
    )
}

export default AdminMatches;
