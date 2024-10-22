import React, { useState, useEffect } from 'react';
import PlayerCard from '../Utils/playerCard';
import { CircularProgress } from '@mui/material';
import { playersCollection } from '../../firebase';
import { Slide } from 'react-awesome-reveal';
import { getDocs } from 'firebase/firestore';
import { showErrorToast } from '../Utils/tools';
import { ref, getDownloadURL, getStorage } from 'firebase/storage';
import { app } from '../../firebase';

const TheTeam = () => {
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState([]);
    const storage = getStorage(app);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const snapshot = await getDocs(playersCollection);
                const fetchedPlayers = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Create an array of promises for fetching image URLs
                const playerPromises = fetchedPlayers.map(async (player) => {
                    try {
                        const storageRef = ref(storage, player.image);
                        const imageUrl = await getDownloadURL(storageRef);
                        return {
                            ...player,
                            url: imageUrl // Store the image URL in the url property
                        };
                    } catch (error) {
                        console.error(`Error fetching image for player ${player.name}:`, error);
                        return {
                            ...player,
                            url: '' // Provide a fallback empty URL
                        };
                    }
                });

                // Wait for all image URLs to be fetched
                const playersWithImages = await Promise.all(playerPromises);
                setPlayers(playersWithImages);
            } catch (error) {
                console.error('Error fetching players:', error);
                showErrorToast("Error while fetching Players");
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, []); // Empty dependency array since we only want to fetch once

    return (
        <div className="w-full">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <CircularProgress className="w-12 h-12" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {players.map((player) => (
                        <Slide key={player.id}>
                            <PlayerCard
                                image={player.url}
                                number={player.number}
                                name={player.name}
                                lastname={player.lastname}
                            />
                        </Slide>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TheTeam;