import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { showErrorToast, showSuccessToast, textErrorHelper, selectErrorHelper, selectIsError } from "../../Utils/tools";
import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material';
import { playersCollection } from "../../../firebase";
import { useParams } from "react-router-dom";


const AddEditPlayers = (props) => {

    const defaultValues = {
        name: '',
        lastname: '',
        number: '',
        position: ''
    }
    const [fomrType, setFormType] = useState('');
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

    console.log(fomrType, values)

    return (
        <>
            <AdminLayout title={fomrType === 'add' ? 'Add Player' : 'Edit Player'}>
                image
                <hr />
                <h4>Player info</h4>
                <div className="mb-5">
                    <FormControl>
                        <TextField
                            id="name"
                            name="name"
                            variant="outlined"
                            placeholder="Add firstname"
                            {...formik.getFieldProps('name')}
                            {...textErrorHelper(formik, 'name')}
                        />

                    </FormControl>
                </div>

                <div className="mb-5">
                    <FormControl>
                        <TextField
                            id="lastname"
                            name="lastname"
                            variant="outlined"
                            placeholder="Add lastname"
                            {...formik.getFieldProps('lastname')}
                            {...textErrorHelper(formik, 'lastname')}
                        />

                    </FormControl>
                </div>

                <div className="mb-5">
                    <FormControl>
                        <TextField
                            type="number"
                            id="number"
                            name="number"
                            variant="outlined"
                            placeholder="Add number"
                            {...formik.getFieldProps('number')}
                            {...textErrorHelper(formik, 'number')}
                        />

                    </FormControl>
                </div>
            </AdminLayout>
        </>
    )
}

export default AddEditPlayers;