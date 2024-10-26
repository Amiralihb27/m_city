import React from 'react';
import { Link } from 'react-router-dom';
import { ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logoutHandler } from '../../Utils/tools';

const AdminNav = () => {
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
    ];

    const renderItems = () => {
        return links.map(link => (
            <ListItemButton
                component={Link}
                to={link.linkTo}
                key={link.title}
                className='admin_nav_link'
            >
                <ListItemText primary={link.title} />
            </ListItemButton>
        ));
    };

    return (
        <div>
            {renderItems()}
            <ListItemButton
                onClick={() => logoutHandler(navigate)}
                className='admin_nav_link'
            >
                <ListItemText primary="Log out" />
            </ListItemButton>
        </div>
    );
};

export default AdminNav;
