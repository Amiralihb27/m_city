import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { CircularProgress } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../../Utils/tools';
import { Navigate } from 'react-router-dom';
import { promotionsCollection } from '../../../firebase'

const Enroll = () => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('The email is required'), 
        }),
        onSubmit: (values) => {
            setLoading(true)
            console.log(values)
        },
        validateOnChange: true,
    })
    return (
        <div className="enroll_wrapper">
            <form onSubmit={formik.handleSubmit}>
                <div className="enroll_title">
                    Enter your Email
                </div>
                <div className="enroll_input">

                    <input
                        name="email"
                        placeholder="Enter your email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className={formik.touched.email && formik.errors.email ? 'input_error' : ''}
                    />
                    {formik.touched.email && formik.errors.email &&
                        <div className="error_label">
                            {formik.errors.email}
                        </div>
                    }
                </div>
                {loading ?
                    <CircularProgress color="secondary" className="progress" />
                    :
                    <button type="submit">Enroll</button>
                }

                <div className="enroll_disc1">
                fdsf sdkfdsjof j fdjsdfj df;jersey
                sdalkdn nsfwerqweo jqwj qwojqwer pouoifu
                </div>
            </form>
        </div>
    )
}

export default Enroll;