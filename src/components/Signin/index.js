import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../Utils/tools';
import { useSignInForm } from './useSignInForm'; // Custom hook
import FormInput from './FormInput'; // Separate input component

const SignIn = ({ user }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const formik = useSignInForm(setLoading, navigate);

    if (user) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="container">
            <div className="signin_wrapper" style={{ margin: '100px' }}>
                <form onSubmit={formik.handleSubmit}>
                    <h2>Please login</h2>
                    <FormInput name="email" placeholder="Email" formik={formik} />
                    <FormInput name="password" type="password" placeholder="Password" formik={formik} />
                    {loading ? (
                        <CircularProgress color="secondary" className="progress" />
                    ) : (
                        <button type="submit" className="submit_button">Log in</button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default SignIn;
