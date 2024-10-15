import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { showErrorToast, showSuccessToast, textErrorHelper, selectErrorHelper, selectIsError } from "../../Utils/tools";
import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material';
import { playersCollection } from "../../../firebase";
import { useParams } from "react-router-dom";
import CustomTextField from "./customTextField";

const AddEditPlayers = (props) => {

    const defaultValues = {
        name: '',
        lastname: '',
        number: '',
        position: ''
    }
    const [formType, setFormType] = useState('');
    const [values, setValues] = useState(defaultValues);
    const { playerid } = useParams();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: values,
        validationSchema: Yup.object({
            name: Yup.string()
                .required('name is required'),
            lastname: Yup.string()
                .required('lastname is required'),
            number: Yup.number()
                .required('number is required')
                .min('0', 'the minimun is 0')
                .max('100', 'the maximum is 100'),
            position: Yup.string()
                .required('position is rrequired')
        }),
        validateOnChange: true,
    })


    useEffect(() => {
        if (playerid) {
            setFormType('edit');
            setValues('just a test')
        } else {
            setFormType('add');
            setValues(defaultValues)
        }

    }, [playerid])

    console.log(formType, values)

    return (
        <>

            <AdminLayout title={formType === 'add' ? 'Add Player' : 'Edit Player'}>
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

                {/* Add other fields like position if necessary */}

                <Button variant="contained" color="primary" type="submit">
                    {formType === 'add' ? 'Add Player' : 'Update Player'}
                </Button>
            </AdminLayout>

        </>
    )
}

export default AddEditPlayers;