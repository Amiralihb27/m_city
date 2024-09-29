import React from "react";

import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

import manchester_city_logo from "../../Resources/images/logos/manchester_city_logo.png";
import { CityLogo } from "../Utils/tools"


const Header = () => {
    return (
        <AppBar
            position="fixed"
            style={{
                backgroundColor: "#98c5e9",
                boxShadow: 'none',
                padding: '0.625px 0',
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
                <Link to="/the_team">
                    <Button color="inherit"> The Team</Button>
                </Link>
                <Link to="/the_matches">
                    <Button color="inherit"> The Matches</Button>
                </Link>
                <Link to="/dashboard">
                    <Button color="inherit"> The dashboard</Button>
                </Link>
            </Toolbar>



        </AppBar>
    )
}

export default Header;