import React from 'react'
import { Link } from 'react-router-dom';
import { ListItem } from '@mui/material';
import { auth } from '../../../firebase';
import { showErrorToast, showSuccessToast, logoutHandler } from '../../Utils/tools';
import AdminLayout from '../AdminLayout';
import { useNavigate } from 'react-router-dom';


const AdminNav = (props) => {
    const navigate = useNavigate();

    const links = [
        {
            title: "Matches",
            linkTo: "/admin_matches"
        },
        {
            title: "Players",
            linkTo: "/admin_players"
        }
    ]

    const renderItems = () => {
        return links.map(link => (
            <Link to={link.linkTo} key={link.title}>
                <ListItem button className='admin_nav_link'>
                    {link.title}
                </ListItem>
            </Link>
        ))
    }
    return (
        <div>
            {renderItems()}
            <Link>
                <ListItem button className='admin_nav_link'
                    onClick={() => (logoutHandler(navigate))}>
                    Log out
                </ListItem>
            </Link>
        </div>
    )
}

export default AdminNav;