import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { playersCollection } from '../../firebase';
import { getDocs } from 'firebase/firestore';
import { showErrorToast } from '../Utils/tools';
import { ref, getDownloadURL, getStorage } from 'firebase/storage';
import { app } from '../../firebase';
import CardsByPosition from './CardsByPosition';

const TheTeam = () => {
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState([]);
    const storage = getStorage(app);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

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
                        //complete this later for getting images from resourses not the firebase.
                        const storageRef = ref(storage, player.image);
                        const imageUrl = await getDownloadURL(storageRef);
                        const decodedPath = decodeURIComponent(imageUrl);

                        // Step 2: Split the string by '/' to isolate the last part containing the file name and query parameters
                        const pathParts = decodedPath.split('/');

                        // Step 3: The image name with query parameters is the last part
                        const imageWithQuery = pathParts[pathParts.length - 1];

                        // Step 4: Remove the query parameters by splitting on '?'
                        const imageName = (imageWithQuery.split('?')[0]).substring(imageWithQuery.indexOf('_') + 1);

                        return {
                            ...player,
                            url: imageName // Store the image URL in the url property
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
    }, [storage]); // Empty dependency array since we only want to fetch once

    return (
        loading ? <div className='progress'>
            <CircularProgress
                size={100}
                thickness={5}
            />
        </div> :
            <div className='the_team_container'>
                <CardsByPosition
                    position='Keeper'
                    players={players}
                />
                <CardsByPosition
                    position='Defence'
                    players={players}
                />
                
               <CardsByPosition
                    position='Midfield'
                    players={players}
                />
                <CardsByPosition
                    position='Striker'
                    players={players}
                />
            </div>
    );
};

export default TheTeam;