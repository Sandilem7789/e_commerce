import React from 'react';
import { ShoppingCart } from "@material-ui/icons";
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from "@material-ui/core";

import logo from "../../assets/shop.png"
import makeStyles from "./styles"

import { Link, useLocation } from "react-router-dom";

const Navbar = ({ totalItems }) => {
    const classes = makeStyles();
    const location = useLocation();

    
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit"
                        component={Link} to="/"
                    >
                        <img src={logo} alt="Thenga.com" height="25px" className="classes.image" style={{paddingRight: 10}}/>
                        Thenga.com
                    </Typography>
                    <div className={classes.grow} />

                    {/*WE SHOW CART ONLY WHEN WE ARE AT THE PRODUCTS PAGE*/}
                    { location.pathname === "/" &&
                        (
                            <div className={classes.button}>
                                {/*Material UI allows us to make a clickable obje a LINK item*/}
                                <IconButton 
                                    aria-label="Show cart items" 
                                    color="inherit"
                                    component={Link}
                                    to="/cart"
                                >
                                    <Badge badgeContent={totalItems} color="secondary">
                                        {console.log("cart badge: ", totalItems)}
                                        <ShoppingCart />
                                    </Badge>
                                </IconButton>
                            </div>
                        )
                    }
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
