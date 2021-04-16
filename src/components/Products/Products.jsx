import React from 'react';
import { Grid } from "@material-ui/core";

import Product from "./Product/Product"

//products array
const products = [
    {id: 1, name: "Shoes", description: "Running Shoes", price: "R1099,99", image: "https://www.pexels.com/photo/person-wearing-grey-nike-sneakers-2729899/"},
    {id: 2, name: "Thinkpad", description: "Lenovo Thinkpad", price: "R3200,00", image: "https://images.pexels.com/photos/2729899/pexels-photo-2729899.jpeg?cs=srgb&dl=pexels-karl-solano-2729899.jpg&fm=jpg"}
];

const Products = () => {
    return (
        <main>
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products
