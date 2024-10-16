import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { showErrorToast, showSuccessToast, textErrorHelper, selectErrorHelper, selectHasError } from "../../Utils/tools";
import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material';
import { playersCollection } from "../../../firebase";
import { useParams } from "react-router-dom";
import CustomTextField from "./customTextField";
import { tr } from "framer-motion/client";

const AddEditPlayers = (props) => {

    const defaultValues = {
        name: '',
        lastname: '',
        number: '',
        position: ''
    }
    const [loading, setLoading] = useState(false);
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
                .required('position is required')
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

                {/* Add other fields like position if necessary */}

                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loading}
                >
                    {formType === 'add' ? 'Add Player' : 'Edit Player'}
                </Button>
            </AdminLayout>

        </>
    )
}

export default AddEditPlayers;