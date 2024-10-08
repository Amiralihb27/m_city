import React from 'react';
import { Link } from 'react-router-dom';
import mcitylogo from "../../Resources/images/logos/manchester_city_logo.png";
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';




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
        position: "top-left"
    })
}

export const showSuccessToast = (msg) => {
    toast.success(msg, {
        position: "top-left"
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
        background:props.bck ? props.bck : '#FFFFFF',
        fontSize:props.size? props.size : '1rem',
        color: props.color? props.color : '#000000',
        padding:'0.3125rem 0.625rem',
        display:'inline-block',
        fontFamily:'Righteous',
        //if you wana overwrite the defaults
        ...props.add
        }}>
        {props.children}
    </div>

    if(props.link){
        return(
            <Link to={props.linkTo}>
                {template}
            </Link>
        )
    }else{
        return(template)
    }
}