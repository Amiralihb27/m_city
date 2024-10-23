import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { teamsCollection, matchesCollection } from "../../../firebase";
import { showErrorToast, showSuccessToast, selectErrorHelper, selectHasError, textErrorHelper } from "../../Utils/tools";
import { useParams, useNavigate } from "react-router-dom";
import { Button, FormControl, MenuItem, Select } from '@mui/material';
import CustomTextField from "../players/customTextField";
import { getDocs } from 'firebase/firestore';
import { addDoc, doc, getDoc, updateDoc } from "firebase/firestore";

const defaultValues = {
    date: '',
    local: '',
    resultLocal: '',
    away: '',
    resultAway: '',
    referee: '',
    stadium: '',
    result: '',
    final: ''
}
const AddEditMatches = () => {
    const [loading, setLoading] = useState(false);
    const [formType, setFormType] = useState('');
    const [teams, setTeam] = useState(null);
    const [values, setValues] = useState(null);
    const { matchid } = useParams();
    const navigate = useNavigate();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: defaultValues,
        validationSchema: Yup.object({
            date: Yup.string().required('This input is required'),
            local: Yup.string().required('This input is required'),
            resultLocal: Yup.number()
                .required('This input is required')
                .min(0, 'The minimum is 0')
                .max(100, 'The maximum is 100'),
            away: Yup.string().required('This input is required'),
            resultAway: Yup.number()
                .required('This input is required')
                .min(0, 'The minimum is 0')
                .max(100, 'The maximum is 100'),
            referee: Yup.string().required('This input is required'),
            stadium: Yup.string().required('This input is required'),
            result: Yup.mixed().required('This input is required').oneOf(['W', 'L', 'D', 'n/a']),
            final: Yup.mixed().required('This input is required').oneOf(['Yes', 'No'])
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    })
    useEffect(() => {
        const fetchMatches = async () => {
            try {
                if (!teams) {
                    setLoading(true);
                    const snapshot = await getDocs(teamsCollection);
                    const fetchedTeams = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setTeam(fetchedTeams);
                    console.log(teams);
                }
            }
            catch (error) {
                console.error("Error fetching matches:", error);
                showErrorToast(error)
            } finally {
                setLoading(false);
            }
        }

        fetchMatches();
    }, [teams]);


    useEffect(() => {
        if (matchid) {
            setFormType('edit');
            fetchAndUpdate(matchid);
        } else {
            setFormType('add');
            formik.setValues(defaultValues);
        }
    }, [matchid]);

    const fetchAndUpdate = async (matchid) => {
        const matchDocRef = doc(matchesCollection, matchid);
        const matchDoc = await getDoc(matchDocRef);
        if (matchDoc.exists()) {
            const matchData = matchDoc.data();
            formik.setValues(matchData);
            setFormType('edit');
        } else {
            showErrorToast("No such document!");
        }
    };

    const showTeams = () => (
        teams ?
            teams.map((item) => (
                <MenuItem key={item.id} value={item.shortName}>
                    {item.shortName}
                </MenuItem>
            ))
            : null
    )


    return (
        <AdminLayout title='undefiend'>
            <div className="editmatch_dialog_wrapper">
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <h4>Select the date</h4>
                        <CustomTextField
                            id="date"
                            name="date"
                            type="date"
                            placeholder="date"
                            formik={formik}
                        />

                        <hr />

                        <h4>Result local</h4>
                        <div className="sameRow mb-5">
                            <FormControl error={selectHasError(formik, 'local')}>
                                <Select
                                    id="local"
                                    name="local"
                                    {...formik.getFieldProps('local')}
                                    variant='outlined'
                                    displayEmpty
                                >
                                    <MenuItem value='' disabled>Select a team</MenuItem>
                                    {showTeams()}
                                </Select>
                                {selectErrorHelper(formik, 'local')}
                            </FormControl>
                            <CustomTextField
                                id="resultLocal"
                                name="resultLocal"
                                type="number"
                                placeholder="resultLocal"
                                variant='outLined'
                                formik={formik}
                                style={{
                                    marginLeft: '10px'
                                }}
                            />

                        </div>

                        <h4>Result away</h4>
                        <div className="sameRow mb-5">
                            <FormControl error={selectHasError(formik, 'away')}>
                                <Select
                                    id="away"
                                    name="away"
                                    {...formik.getFieldProps('away')}
                                    variant='outlined'
                                    displayEmpty
                                >
                                    <MenuItem value='' disabled>Select a team</MenuItem>
                                    {showTeams()}
                                </Select>
                                {selectErrorHelper(formik, 'away')}
                            </FormControl>
                            <CustomTextField
                                id="resultAway"
                                name="resultAway"
                                type="number"
                                placeholder="resultAway"
                                variant='outLined'
                                formik={formik}
                                style={{
                                    marginLeft: '10px'
                                }}
                            />

                        </div>
                    </form>
                </div>
            </div>

        </AdminLayout>
    )
}

export default AddEditMatches;