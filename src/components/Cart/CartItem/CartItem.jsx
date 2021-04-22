import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from "@material-ui/core";

import useStyles from "../styles";

const CartItem = ({ item }) => {
    const classes = useStyles();
    return (
        <Card>
            <CardMedia 
                image={item.media.source} 
                alt={item.name} className={classes.media}
                height="0" width="20%" 
                style={{height: "10vh", paddingTop: '50%'}} />
            <CardContent className={classes.cardContent} >
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons} style={{display: "flex"}}>
                    <Button type="button" size="small">-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small">+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary">Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem
