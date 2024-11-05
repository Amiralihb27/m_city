import React from "react";

import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

import manchester_city_logo from "../../Resources/images/logos/manchester_city_logo.png";
import { CityLogo } from "../Utils/tools"

// import { signOut } from 'firebase/auth';
// import { auth } from '../../firebase';
import { logoutHandler } from "../Utils/tools";
import { toast } from 'react-toastify';
import { showErrorToast, showSuccessToast } from '../Utils/tools';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Header = ({ user }) => {
    const notify = () => toast("Successfully Logged out!");
    const navigate = useNavigate();
    return (
        <AppBar
            position="fixed"
            style={{
                backgroundColor: "#98c5e9",
                boxShadow: 'none',
                padding: '0.625rem 0',
                borderBottom: '0.125rem solid #00285e'
            }}>

            <Toolbar
                style={{
                    display: "flex",

                }}>
                <div style={{ flexGrow: 1 }}>
                    <div className="header_logo">
                        <CityLogo
                            link={true}
                            linkTo='/'
                            width="70px"
                            height="70px"
                        />
                    </div>

                </div>
                <Link to="/">
                    <Button color="inherit">Home</Button>
                </Link>
                <Link to="/the_team">
                    <Button color="inherit"> The Team</Button>
                </Link>
                <Link to="/the_matches">
                    <Button color="inherit"> The Matches</Button>
                </Link>
                {user ?
                    <>

                        <Link to="/dashboard">
                            <Button color="inherit"> The dashboard</Button>
                        </Link>
                        <Button color="inherit"
                            onClick={() => logoutHandler(navigate)}> Log Out</Button>
                    </>
                    :
                    null
                }
                {!user &&
                    <>

                        <Link to="/sign_in">
                            <Button color="inherit"> sign in</Button>
                        </Link>

                    </>

                }
            </Toolbar>



        </AppBar>
    )
}

export default Header;