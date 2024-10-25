// src/components/admin/match/AddEditMatches.js
import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { matchesCollection } from "../../../firebase";
import { showErrorToast, showSuccessToast } from "../../Utils/tools";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import { addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import CustomTextField from "../../Utils/customTextField";
import TeamSelectRow from "./TeamSelectRow";
import MatchInfo from "./MatchInfo";
import ResultSelect from "./ResultSelect";
import FinalSelect from "./FinalSelect";
import useFetchTeams from '../../../hooks/useFetchTeams';
import {  CircularProgress } from '@mui/material';


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
};

const AddEditMatches = () => {
    const [formType, setFormType] = useState('add'); // 'add' or 'edit'
    const { teams, loading: teamsLoading } = useFetchTeams();
    const [loading, setLoading] = useState(false);
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
                .max(100, 'The maximum is 100')
                .required('This input is required'),
            away: Yup.string().required('This input is required'),
            resultAway: Yup.number()
                .min(0, 'The minimum is 0')
                .max(100, 'The maximum is 100')
                .required('This input is required'),
            referee: Yup.string().required('This input is required'),
            stadium: Yup.string().required('This input is required'),
            result: Yup.string().oneOf(['W', 'L', 'D', 'n/a']).required('This input is required'),
            final: Yup.string().oneOf(['Yes', 'No']).required('This input is required')
        }),
        onSubmit: (values) => {
            submitForm(values);
        }
    });

    // Fetch match data if editing
    useEffect(() => {
        if (matchid) {
            setFormType('edit');
            fetchMatchData(matchid);
        } else {
            setFormType('add');
            formik.resetForm();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchid]);

    const fetchMatchData = async (id) => {
        try {
            setLoading(true);
            const matchDocRef = doc(matchesCollection, id);
            const matchDoc = await getDoc(matchDocRef);
            if (matchDoc.exists()) {
                const matchData = matchDoc.data();
                formik.setValues(matchData);
            } else {
                showErrorToast("No such document!");
            }
        } catch (error) {
            console.error("Error fetching match data:", error);
            showErrorToast("Error fetching match data");
        } finally {
            setLoading(false);
        }
    };

    const prepareData = (values) => {
        const datatoSubmit = { ...values };
        teams.forEach(team => {
            if (team.shortName === datatoSubmit.local) {
                datatoSubmit.localThmb = team.thmb;
            }
            if (team.shortName === datatoSubmit.away) {
                datatoSubmit.awayThmb = team.thmb;
            }
        });
        return datatoSubmit;
    };

    const submitForm = async (values) => {
        try {
            setLoading(true);
            const datatoSubmit = prepareData(values);
            if (formType === 'add') {
                await addDoc(matchesCollection, datatoSubmit);
                showSuccessToast("Match Added!");
            } else {
                const matchDocRef = doc(matchesCollection, matchid);
                await updateDoc(matchDocRef, datatoSubmit);
                showSuccessToast("Match Updated!");
            }
            navigate('/admin_matches');
        } catch (error) {
            console.error("Error submitting form:", error);
            showErrorToast("Error while submitting form");
        } finally {
            setLoading(false);
        }
    };

    if (loading || teamsLoading) {
        return (
            <AdminLayout title={formType === 'add' ? 'Add Match' : 'Edit Match'}>
                <div className="editmatch_dialog_wrapper loading_adminMatches">
                    <CircularProgress />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title={formType === 'add' ? 'Add Match' : 'Edit Match'}>
            <div className="editmatch_dialog_wrapper">
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

                    <TeamSelectRow
                        label="Result Local"
                        selectName="local"
                        resultName="resultLocal"
                        teams={teams}
                        formik={formik}
                    />

                    <TeamSelectRow
                        label="Result Away"
                        selectName="away"
                        resultName="resultAway"
                        teams={teams}
                        formik={formik}
                    />

                    <hr />

                    <MatchInfo formik={formik} />

                    <ResultSelect formik={formik} />

                    <div className="mt-5">
                        <FinalSelect formik={formik} />
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
        </AdminLayout>
    );
};

export default AddEditMatches;
