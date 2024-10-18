import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { showErrorToast, showSuccessToast, selectErrorHelper, selectHasError } from "../../Utils/tools";import { Button, FormControl, MenuItem, Select } from '@mui/material';
import { playersCollection } from "../../../firebase";
import { addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import CustomTextField from "./customTextField";
import { useParams, useNavigate } from "react-router-dom";
import FileUploaderComponent from '../../Utils/fileUploader';

const AddEditPlayers = (props) => {
    const defaultValues = {
        name: '',
        lastname: '',
        number: '',
        position: '',
        image: '' // Add image field to the default values
    };

    const [loading, setLoading] = useState(false);
    const [formType, setFormType] = useState('');
    const [values, setValues] = useState(defaultValues);
    const { playerid } = useParams();
    const navigate = useNavigate();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: values,
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            lastname: Yup.string().required('Lastname is required'),
            number: Yup.number().required('Number is required').min(0, 'The minimum is 0').max(100, 'The maximum is 100'),
            position: Yup.string().required('Position is required')
        }),
        validateOnChange: true,
        onSubmit: (values) => {
            submitForm(values);
        }
    });

    const submitForm = async (values) => {
        try {
            setLoading(true);
            // Ensure we have all required data
            const playerData = {
                ...values,
                image: values.image || '' // Ensure image field exists even if empty
            };
            if (formType === 'add') {
                await addDoc(playersCollection, playerData);
                showSuccessToast("Player Added!");
                formik.resetForm();
                navigate('/admin_players');
            } else {
                const playerDocRef = doc(playersCollection, playerid);
                await updateDoc(playerDocRef, playerData);
                showSuccessToast("Player Updated!");
                setLoading(false);
            }
        } catch (error) {
            showErrorToast("Error while adding player");
            setLoading(false);
        }
    };


    const handleUploadSuccess = (filename, downloadURL) => {
        formik.setFieldValue('image', downloadURL);
    };

    useEffect(() => {
        if (playerid) {
            setFormType('edit');
            fetchAndUpdate(playerid);
        } else {
            setFormType('add');
            setValues(defaultValues);
        }
    }, [playerid]);

    const fetchAndUpdate = async (playerid) => {
        const playerDocRef = doc(playersCollection, playerid);
        const playerDoc = await getDoc(playerDocRef);
        if (playerDoc.exists()) {
            formik.setValues(playerDoc.data());
            setFormType('edit');
        } else {
            showErrorToast("No such document!");
        }
    };

    return (
        <AdminLayout title={formType === 'add' ? 'Add Player' : 'Edit Player'}>
            <div className="editplayers_dialog_wrapper">
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <FileUploaderComponent
                            dir="players"
                            onUploadSuccess={handleUploadSuccess}
                        />
                        {formik.values.image && (
                            <div className="mb-4">
                                <img
                                    src={formik.values.image}
                                    alt="Current player"
                                    style={{ height: '200px' }}
                                />
                            </div>
                        )}
                        <hr />
                        <h4>Player Info</h4>
                        <CustomTextField
                            id="name"
                            name="name"
                            placeholder="First name"
                            formik={formik}
                        />
                        <CustomTextField
                            id="lastname"
                            name="lastname"
                            placeholder="Last name"
                            formik={formik}
                        />
                        <CustomTextField
                            type="number"
                            id="number"
                            name="number"
                            placeholder="Number"
                            formik={formik}
                        />
                        <div className="mb-5">
                                <FormControl error={selectHasError(formik, 'position')}>
                                    <Select
                                        id="position"
                                        name="position"
                                        {...formik.getFieldProps('position')}
                                        variant='outlined'
                                        displayEmpty
                                    >
                                        <MenuItem value='' disabled >Select a position</MenuItem>
                                        <MenuItem value='Keeper'>Keeper</MenuItem>
                                        <MenuItem value='Defence' >Defence</MenuItem>
                                        <MenuItem value='Midfield'>Midfield</MenuItem>
                                        <MenuItem value='Striker' >Sytriker</MenuItem>

                                    </Select>
                                    {selectErrorHelper(formik, 'position')}
                                </FormControl>
                            </div>

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={loading}
                        >
                            {formType === 'add' ? 'Add Player' : 'Edit Player'}
                        </Button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AddEditPlayers;
