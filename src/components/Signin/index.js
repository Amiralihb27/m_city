import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../../firebase';


import { CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../Utils/tools';
import { Navigate } from 'react-router-dom';

const SignIn = (props) => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

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
            submitForm(values);
        },
        validateOnChange: true,
    })

    const submitForm = (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password).then(
            (userCredential) => {
                // const user = userCredential.user;
                // console.log(user)
                showSuccessToast('Welcome back!!');
                navigate('/dashboard');
            }
        ).catch((error) => {
            // const errorCode = error.code;   
            // const errorMessage = error.message;
            setLoading(false)
            showErrorToast("either password or username is wrong")
        });


    };

    if (!props.user) {
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
                            <button type="submit" style={{
                                cursor: 'pointer'
                            }}>Log in</button>
                        }
                    </form>

                </div>
            </div>
        )
    } else {
        return <Navigate to='/dashboard' />
    }


}

export default SignIn