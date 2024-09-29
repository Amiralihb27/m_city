import React, { useState } from 'react';

import { CircularProgress } from '@mui/material';
import { Redirect } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignIn = () => {
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('The email is required'),
            password: Yup.string()
                .required('The password is required')
        }),
        onSubmit: (values) => {
            setLoading(true)
            console.log(values)
        },
        validateOnChange: true,
    })


    return (
        <div className="container">
            <div className="signin_wrapper" style={{ margin: '100px' }}>

                <form onSubmit={formik.handleSubmit}>
                    <h2>Please login</h2>
                    <input
                        name="email"
                        placeholder="Email"
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


                    <input
                        name="password"
                        type="password"
                        placeholder='password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className={formik.touched.password && formik.errors.password ? 'input_error' : ''}
                    />
                    {formik.touched.password && formik.errors.password &&
                        <div className="error_label">
                            {formik.errors.password}
                        </div>
                    }


                    {loading ?
                        <CircularProgress color="secondary" className="progress" />
                        :
                        <button type="submit">Log in</button>
                    }


                </form>

            </div>
        </div>
    )

}

export default SignIn