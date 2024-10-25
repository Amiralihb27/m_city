import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { teamsCollection, matchesCollection } from "../../../firebase";
import { showErrorToast, showSuccessToast, selectErrorHelper, selectHasError, textErrorHelper } from "../../Utils/tools";
import { useParams, useNavigate } from "react-router-dom";
import { Button, FormControl, MenuItem, Select } from '@mui/material';
import CustomTextField from "../../Utils/customTextField";
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
                .min(0, 'The minimum is 0')
                .max(100, 'The maximum is 100'),
            away: Yup.string().required('This input is required'),
            resultAway: Yup.number()
                .min(0, 'The minimum is 0')
                .max(100, 'The maximum is 100'),
            referee: Yup.string().required('This input is required'),
            stadium: Yup.string().required('This input is required'),
            result: Yup.mixed().required('This input is required').oneOf(['W', 'L', 'D', 'n/a']),
            final: Yup.mixed().required('This input is required').oneOf(['Yes', 'No'])
        }),
        onSubmit: (values) => {
            console.log(values);
            submitForm(values);
        }
    })

    const submitForm = async(values) => {
        let datatoSubmit = prepareData(values);
        console.log(datatoSubmit)
        try {
            setLoading(true);

            if (formType === 'add') {
                await addDoc(matchesCollection, datatoSubmit);
                showSuccessToast("Match Added!");
                formik.resetForm();
                navigate('/admin_matches');
            } else {
                const playerDocRef = doc(matchesCollection, matchid);
                await updateDoc(playerDocRef, datatoSubmit);
                showSuccessToast("Match Updated!");
                navigate('/admin_matches');
            }
        } catch (error) {
            showErrorToast("Error while submitting form");
        } finally {
            setLoading(false);
        }


    }

    const prepareData=(values) =>{
        let datatoSubmit = values;
        teams.forEach(team => {
            if (team.shortName === datatoSubmit.local) {
                datatoSubmit['localThmb'] = team.thmb
            } else if (team.shortName === datatoSubmit.away) {
                datatoSubmit['awayThmb'] = team.thmb
            }
        });
        return datatoSubmit;
    }

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
        <AdminLayout title={formType === 'add' ? 'Add Match' : 'Edit Match'}>
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
                        <div className="sameRow">
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
                        <hr />
                        <div>
                            <h4>Match Info</h4>
                            <CustomTextField
                                id="referee"
                                name="referee"
                                type="referee"
                                placeholder="Add the referee name"
                                formik={formik}
                            />
                            <CustomTextField
                                id="stadium"
                                name="stadium"
                                type="stadium"
                                placeholder="Add the stadium name"
                                formik={formik}
                            />
                            <FormControl error={selectHasError(formik, 'result')}>
                                <Select
                                    id="result"
                                    name="result"
                                    {...formik.getFieldProps('result')}
                                    variant='outlined'
                                    displayEmpty
                                >
                                    <MenuItem value='' disabled>Select a result</MenuItem>
                                    <MenuItem value='W' >Win</MenuItem>
                                    <MenuItem value='L' >Lose</MenuItem>
                                    <MenuItem value='D' >Draw</MenuItem>
                                    <MenuItem value='n/a' >Not available</MenuItem>

                                </Select>
                                {selectErrorHelper(formik, 'result')}
                            </FormControl>

                        </div>
                        <div className="mt-5">
                            <FormControl error={selectHasError(formik, 'final')}>
                                <Select
                                    id="final"
                                    name="final"
                                    {...formik.getFieldProps('final')}
                                    variant='outlined'
                                    displayEmpty
                                >
                                    <MenuItem value='' disabled>Was the game played?</MenuItem>
                                    <MenuItem value='Yes' >Yes</MenuItem>
                                    <MenuItem value='No' >No</MenuItem>
                                </Select>
                                {selectErrorHelper(formik, 'final')}
                            </FormControl>
                        </div>
                        <div className="mt-5">

                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={loading}
                            >
                                {formType === 'add' ? 'Add Match' : 'Edit Match'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

        </AdminLayout>
    )
}

export default AddEditMatches;