import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { teamsCollection, matchesCollection } from "../../../firebase";
import { showErrorToast, showSuccessToast, selectErrorHelper, selectHasError, textErrorHelper } from "../../Utils/tools";
import { useParams, useNavigate } from "react-router-dom";
import { tr } from "framer-motion/client";


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
    const [loading, setloading] = useState(false);
    const [formType, setFormType] = useState('');
    const [team, setTeam] = useState([]);
    const [values, setValues] = useState(null);
    const { matchrid } = useParams();
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
        onSubmit:  (values) => {
            console.log(values);
        }
    })


    return (
        <>  <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div>
                Edit
            </div>
        </>
    )
}

export default AddEditMatches;