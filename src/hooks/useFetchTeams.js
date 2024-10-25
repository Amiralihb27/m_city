// src/hooks/useFetchTeams.js
import { useState, useEffect } from 'react';
import { getDocs } from 'firebase/firestore';
import { teamsCollection } from "../firebase";
import { showErrorToast } from '../components/Utils/tools';

const useFetchTeams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                setLoading(true);
                const snapshot = await getDocs(teamsCollection);
                const fetchedTeams = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                console.log(fetchTeams);
                setTeams(fetchedTeams);
            } catch (error) {
                console.error("Error fetching teams:", error);
                showErrorToast("Error fetching teams");
            } finally {
                setLoading(false);
            }
        };
        fetchTeams();
    }, []);

    return { teams, loading };
};

export default useFetchTeams;
