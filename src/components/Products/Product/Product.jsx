import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

import useStyles from './styles';

const Product = ({ product }) => {
    //calling the styles
    const classes = useStyles;

    //the product variables like name and price are actually from the back end API
    return (
        <Card className={classes.root}>
            <img src={product.media.source}  height="200" /> {/*had to resort to the  basics, framework doent wanna display image for some reason idk below*/}
            <CardMedia className={classes.media} image={product.media.source} height="100%" title={product.name} />
            <CardContent>
                
                <div className="classes.cardContent">
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5">
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: product.description}} variant="body2" color="textSecondary"/>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Cart">
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
