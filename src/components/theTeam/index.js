import React , {useState,useEffect} from 'react';
import PlayerCard from '../Utils/playerCard';
import {CircularProgress} from '@mui/material';
import {auth,playersCollection} from '../../firebase';
import { Slide } from 'react-awesome-reveal';
import { getDocs } from 'firebase/firestore';
import { showErrorToast } from '../Utils/tools';
import {Promise} from 'core-js';
import { ref, getDownloadURL, getStorage } from 'firebase/storage';
import {app} from '../../firebase'




const TheTeam = ()=>{
    const [loading,setLoading] = useState(false);
    const [players,setPlayers] = useState([]);
    const storage = getStorage(app);
    useEffect(() => {
        if (players.length === 0) {
            console.log("Fetching data...");    
            getDocs(playersCollection)
                .then(snapshot => {
                    const fetchedPlayers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    console.log(fetchedPlayers[1].image)
                    let promises = []
                     fetchedPlayers.forEach((player)=>{
                        promises.push(
                            new Promise((resolve,reject)=>{
                                const storageRef = ref(storage, player.image.split("/o/")[1].split("?")[0]);
                            })
                        )
                     })
                    setPlayers(fetchedPlayers);
                    setLoading(false); // Set loading to false once data is fetched
                })
                .catch(error => {
                    showErrorToast("Error while fetching Players");
                    setLoading(false); // Set loading to false even if there's an error
                });
        }
    }, [players]);

      console.log('players',players);
    return(
        <>
            The teams
        </>
    )
}

export default TheTeam;