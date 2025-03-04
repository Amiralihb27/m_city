import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { playersCollection } from '../../../firebase';
import { getDocs, query, limit, startAfter } from "firebase/firestore";
import { Button } from "@mui/material";
import { showErrorToast } from "../../Utils/tools";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { CircularProgress } from "@mui/material";


const AdminPlayers = () => {
    const [players, setPlayers] = useState(null);
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                if (!players) {
                    setLoading(true);
                    const q = query(playersCollection, limit(2)); // Use query for limits
                    const snapshot = await getDocs(q); // Use getDocs to fetch data
                    const playersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    // console.log(playersData)
                    setPlayers(playersData);
                    const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
                    setLastVisible(lastVisibleDoc);
                    // console.log(lastVisibleDoc);
                }
            } catch (error) {
                console.error("Error fetching players:", error);
                showErrorToast(error)
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, []);

    const loadMorePlayer = async () => {
        try {
            if (lastVisible) {
                setLoading(false);
                const q = query(playersCollection, limit(2), startAfter(lastVisible)); // Use query for limits
                const snapshot = await getDocs(q); // Use getDocs to fetch data
                const newPlayerData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPlayers([...players, ...newPlayerData]);
                const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
                setLastVisible(lastVisibleDoc);
               
            }
            else {
                console.log('no more player to load')
                showErrorToast('no more player to load')
            }
        } catch (error) {
            console.log('Error loading more  players:', error)
            showErrorToast(error)
        }
    }
    return (

        <AdminLayout title="The Players">
            <div className='mb-5'>
                <Button
                    variant="contained"
                    style={{ backgroundColor: '#67D7DB' }}
                    component={Link}
                    to='/admin_players/add_player'
                >
                    Add Player
                </Button>
            </div>
            {players && players.length > 0 ? (
                <Paper className="mb-5">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>First name</TableCell>
                                <TableCell >Last name</TableCell>
                                <TableCell >Number</TableCell>
                                <TableCell >Position</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {players.map((player) => (
                                <TableRow
                                    key={player.id} // Use a unique identifier for the key
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell >
                                        <Link to={`/admin_players/edit_player/${player.id}`}>
                                            {player.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell >
                                        <Link to={`/admin_players/edit_player/${player.id}`}>
                                            {player.lastname}
                                        </Link>
                                    </TableCell>
                                    <TableCell >{player.number}</TableCell>
                                    <TableCell >{player.position}</TableCell>
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

export default AdminPlayers;
