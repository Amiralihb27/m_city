import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { showErrorToast, showSuccessToast, textErrorHelper, selectErrorHelper, selectHasError } from "../../Utils/tools";
import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material';
import { playersCollection } from "../../../firebase";
import { addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import CustomTextField from "./customTextField";
import { useParams, useNavigate } from "react-router-dom";
import FileUploaderComponent from '../../Utils/fileUploader'; // Import the FileUploaderComponent


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
            name: Yup.string().required('name is required'),
            lastname: Yup.string().required('lastname is required'),
            number: Yup.number().required('number is required').min(0, 'the minimum is 0').max(100, 'the maximum is 100'),
            position: Yup.string().required('position is required')
        }),
        validateOnChange: true,
        onSubmit: (values) => {
            submitForm(values);
        }
    });

    const submitForm = async (values) => {
        try {
            setLoading(true);
            if (formType === 'add') {
                await addDoc(playersCollection, values);
                showSuccessToast("Player Added!!!");
                formik.resetForm();
                navigate('/admin_players');
            } else {
                const playerDocRef = doc(playersCollection, playerid);
                await updateDoc(playerDocRef, values);
                showSuccessToast("Player Updated!!!");
                setLoading(false);
            }
        } catch (error) {
            showErrorToast("Error while adding Player");
            setLoading(false);
        }
    };

    const handleUploadSuccess = (filename, downloadURL) => {
        console.log(downloadURL);
        formik.setFieldValue('image', downloadURL); // Save the uploaded image URL
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
                        <hr />
                        <h4>Player info</h4>
                        <CustomTextField
                            id="name"
                            name="name"
                            placeholder="firstname"
                            formik={formik}
                        />
                        <CustomTextField
                            id="lastname"
                            name="lastname"
                            placeholder="lastname"
                            formik={formik}
                        />
                        <CustomTextField
                            type="number"
                            id="number"
                            name="number"
                            placeholder="number"
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
                                    <MenuItem value='' disabled>Select a position</MenuItem>
                                    <MenuItem value='Keeper'>Keeper</MenuItem>
                                    <MenuItem value='Defence'>Defence</MenuItem>
                                    <MenuItem value='Midfield'>Midfield</MenuItem>
                                    <MenuItem value='Striker'>Striker</MenuItem>
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
