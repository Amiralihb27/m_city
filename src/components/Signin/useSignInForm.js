import { useFormik } from 'formik';
import * as Yup from 'yup';
import { auth, signInWithEmailAndPassword } from '../../firebase';
import { showErrorToast, showSuccessToast } from '../Utils/tools';

export const useSignInForm = (setLoading, navigate) => {
    return useFormik({
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
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await signInWithEmailAndPassword(auth, values.email, values.password);
                showSuccessToast('Welcome back!!');
                navigate('/dashboard');
            } catch (error) {
                setLoading(false);
                showErrorToast('Either password or username is wrong');
            }
        },
        validateOnChange: true,
    });
};
