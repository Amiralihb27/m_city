import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { playersCollection } from '../../../firebase';
import { getDocs, query, limit, startAfter } from "firebase/firestore";
import { Button } from "@mui/material";

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
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, [players]);

    const loadMorePlayer = async () => {
        try {

            if (lastVisible) {
                setLoading(false);
                const q = query(playersCollection, limit(2), startAfter(lastVisible)); // Use query for limits
                const snapshot = await getDocs(q); // Use getDocs to fetch data
                const newPlayerData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPlayers([...players, ...newPlayerData]);
                console.log(players )
            }
            else {
                console.log('no more player to load')
            }
        } catch (error) {
            console.log('Error loading more  players:', error)
        }

    }
    return (

        <AdminLayout title="The Players">
            <Button
                onClick={loadMorePlayer}>

                Load more
            </Button>
        </AdminLayout>
    )
}

export default AdminPlayers;
