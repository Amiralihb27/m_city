import React from 'react';
import { Link } from 'react-router-dom';
import mcitylogo from "../../Resources/images/logos/manchester_city_logo.png";
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ref, deleteObject ,getStorage} from 'firebase/storage';
import { app } from '../../firebase';
import { FormHelperText } from '@mui/material'


export const CityLogo = (props) => {
    const template = <div
        className='img_cover'
        style={{
            width: props.width,
            height: props.height,
            background: `url(${mcitylogo}) no-repeat`
        }}>


    </div>
    if (props.link) {
        return (
            <Link className='link_logo' to={props.linkTo}>
                {template}
            </Link>
        )

    } else {
        return template;
    }

}

export const showErrorToast = (msg) => {
    toast.error(msg, {
        position: "top-left",
        theme: "colored"
    })
}

export const showSuccessToast = (msg) => {
    toast.success(msg, {
        position: "top-left", theme: "colored"
    })
}

export const logoutHandler = (navigate) => {
    signOut(auth)
        .then(() => {
            showSuccessToast('Good Bye!!!');
            navigate('/');  // Navigate to the home page
        })
        .catch(err => {
            showErrorToast(err.message);
        });
};

export const Tag = (props) => {

    const template = <div
        style={{
            background: props.bck ? props.bck : '#FFFFFF',
            fontSize: props.size ? props.size : '1rem',
            color: props.color ? props.color : '#000000',
            padding: '0.3125rem 0.625rem',
            display: 'inline-block',
            fontFamily: 'Righteous',
            //if you wana overwrite the defaults
            ...props.add
        }}>
        {props.children}
    </div>

    if (props.link) {
        return (
            <Link to={props.linkTo}>
                {template}
            </Link>
        )
    } else {
        return (template)
    }
}

export const textErrorHelper = (formik,values) => ({
    error:formik.errors[values] && formik.touched[values],
    helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values]:null
})

export const selectErrorHelper = (formik,values) => {
    if(formik.errors[values] && formik.touched[values]){
        console.log(formik.errors)
        return (<FormHelperText
        style={{
            color:'#d32f2f'
        }}>{formik.errors[values]}</FormHelperText>)
    }
    return false;
}

export const  selectHasError = (formik,values) => {
    return formik.errors[values] && formik.touched[values];
}

export   const DeleteFile = (file) => {
    console.log(file)
    const storage = getStorage(app);
    const desertRef = ref(storage, file);

    // Delete the file
    deleteObject(desertRef).then(() => {
     console.log('Removed from storage')
    }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log('Error')
        showErrorToast("Error while removing Image!!!")
    });
}