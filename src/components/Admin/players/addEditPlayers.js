import React, { useState, useEffect, useRef } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { showErrorToast, showSuccessToast, selectErrorHelper, selectHasError ,textErrorHelper } from "../../Utils/tools";
import { Button, FormControl, MenuItem, Select } from '@mui/material';
import { playersCollection } from "../../../firebase";
import { addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import CustomTextField from "./customTextField";
import { useParams, useNavigate } from "react-router-dom";
import FileUploaderComponent from '../../Utils/fileUploader';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from 'firebase/storage';
import { app } from '../../../firebase';

const AddEditPlayers = () => {
    const defaultValues = {
        name: '',
        lastname: '',
        number: '',
        position: '',
        image: ''
    };

    const [loading, setLoading] = useState(false);
    const [formType, setFormType] = useState('');
    const [tempImageFile, setTempImageFile] = useState(null);
    const [tempImagePreview, setTempImagePreview] = useState('');
    const { playerid } = useParams();
    const navigate = useNavigate();
    const fileUploaderRef = useRef(null);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: defaultValues,
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            lastname: Yup.string().required('Lastname is required'),
            number: Yup.number()
                .required('Number is required')
                .min(0, 'The minimum is 0')
                .max(100, 'The maximum is 100'),
            position: Yup.string().required('Position is required'),
            image: Yup.string().required('Image is required')
        }),
        onSubmit: async (values) => {
            await submitForm(values);
        }
    });

    const uploadImageToFirebase = async (file) => {
        const storage = getStorage(app);
        const timestamp = new Date().getTime();
        const uniqueFilename = `${timestamp}_${file.name}`;
        const storageRef = ref(storage, `players/${uniqueFilename}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                null,
                (error) => reject(error),
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve(downloadURL);
                    } catch (error) {
                        reject(error);
                    }
                }
            );
        });
    };

    const submitForm = async (values) => {
        try {
            setLoading(true);
            let imageUrl = tempImageFile ? await uploadImageToFirebase(tempImageFile) : values.image;

            const playerData = {
                ...values,
                image: imageUrl
            };

            if (formType === 'add') {
                await addDoc(playersCollection, playerData);
                showSuccessToast("Player Added!");
                formik.resetForm();
                resetImage(); // Reset the image input after adding
                navigate('/admin_players');
            } else {
                const playerDocRef = doc(playersCollection, playerid);
                await updateDoc(playerDocRef, playerData);
                showSuccessToast("Player Updated!");
                navigate('/admin_players');
            }
        } catch (error) {
            showErrorToast("Error while submitting form");
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = (file, previewURL) => {
        // Clean up previous preview URL if it exists
        if (tempImagePreview && tempImagePreview !== formik.values.image) {
            URL.revokeObjectURL(tempImagePreview);
        }
        
        setTempImageFile(file);
        setTempImagePreview(previewURL);
        formik.setFieldValue('image', previewURL); // Set image value to preview URL
    };

    const resetImage = () => {
        // Clean up temporary preview URL
        if (tempImagePreview && tempImagePreview !== formik.values.image) {
            URL.revokeObjectURL(tempImagePreview);
        }
        
        setTempImageFile(null);
        setTempImagePreview('');
        formik.setFieldValue('image', ''); // Reset image field value

        // Reset file input using the ref
        if (fileUploaderRef.current) {
            fileUploaderRef.current.resetInput();
        }
    };

    useEffect(() => {
        if (playerid) {
            setFormType('edit');
            fetchAndUpdate(playerid);
        } else {
            setFormType('add');
            formik.setValues(defaultValues);
        }

        // Cleanup function
        return () => {
            if (tempImagePreview && tempImagePreview !== formik.values.image) {
                URL.revokeObjectURL(tempImagePreview);
            }
        };
    }, [playerid]);

    const fetchAndUpdate = async (playerid) => {
        const playerDocRef = doc(playersCollection, playerid);
        const playerDoc = await getDoc(playerDocRef);
        if (playerDoc.exists()) {
            const playerData = playerDoc.data();
            formik.setValues(playerData);
            if (playerData.image) {
                setTempImagePreview(playerData.image);
            }
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
                            ref={fileUploaderRef}
                            onFileSelect={handleFileSelect}
                        />

                        {(tempImagePreview || formik.values.image) && (
                            <div className="image_upload_container">
                                <img
                                    src={tempImagePreview || formik.values.image}
                                    alt="Player preview"
                                    style={{ width: '100%' }}
                                />
                                <div className="remove" onClick={resetImage}>Remove</div>
                            </div>
                        )}
                        {selectErrorHelper(formik, 'image')}
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
