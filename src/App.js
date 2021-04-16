import React, { useState, useEffect } from 'react';
import { commerce } from "./lib/commerce";          //this API will do al the backend for us and we will only focus on the front end

import {Products, Navbar } from "./components";         //file that makes this possible: ./components/index.js

const App = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    }, [])                  //empty dependency array means this hook is going to run on load

    console.log(products);
    return (
        <div>
            <Navbar />
            <Products products={products} />
        </div>
    )
}

export default App
