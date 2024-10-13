import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showErrorToast, showSuccessToast } from '../../Utils/tools';
import { promotionsCollection } from '../../../firebase';
import { query, where, getDocs, addDoc } from "firebase/firestore";

const Enroll = () => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')   // Error for invalid email
                .required('The email is required'), // Error for empty email
        }),
        onSubmit: (values) => {
            setLoading(true);
            submitForm(values.email);
        },
        validateOnChange: false,  // Do not validate onChange
        validateOnBlur: false,    // Do not validate onBlur
    });

    const submitForm = async (email) => {
        try {
            const q = query(promotionsCollection, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                showErrorToast("Sorry, you are already on the list");
            } else {
                await addDoc(promotionsCollection, { email });
                showSuccessToast('Congratulations!!!');
            }
        } catch (error) {
            console.error("Error with Firestore operations:", error);
        } finally {
            setLoading(false); // Ensure loading is disabled after async operation
        }
    };

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
                        onChange={(e) => {
                            formik.setFieldTouched('email', false);  // Remove error when typing
                            formik.handleChange(e);
                        }}
                        value={formik.values.email}       
                        className={formik.errors.email && formik.touched.email ? 'input_error' : ''}
                    />
                    {formik.errors.email && formik.touched.email && (  // Show errors on form submit
                        <div className="error_label">
                            {formik.errors.email}
                        </div>
                    )}
                </div>
                {loading ? (
                    <CircularProgress color="secondary" className="progress" />
                ) : (
                    <button
                        type="submit"
                        style={{ cursor: 'pointer' }}
                        onClick={() => formik.setTouched({ email: true })}  // Mark the input as touched when submitting
                    >
                        Enroll
                    </button>
                )}
                <div className="enroll_discl">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non ullamcorper nulla. Etiam tempor, nibh
                </div>
            </form>
        </div>
    );
};

export default Enroll;
