import React, { useState, useEffect } from 'react';
import { commerce } from "./lib/commerce";          //this API will do al the backend for us and we will only focus on the front end

import { Products, Navbar, Cart } from "./components";         //file that makes this possible: ./components/index.js
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({}); 

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        
        setProducts(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    /*ADD ITEMS TO CART*/
    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);

        setCart(cart);
    }

    /*UPDATING THE QUANTITY OF CART*/
    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });

        setCart(cart);
    }

    /*REAMOVING FROM CART*/
    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);

        setCart(cart);
    }

    /*EMPTYING THE ENTIRE CART*/
    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();

        setCart(cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, [])                  //empty dependency array means this hook is going to run on load

    console.log("The Cart: ", cart);

    //console.log(products);
    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={handleAddToCart} />
                    </Route>
                    <Route exact path="/cart">
                        <Cart 
                            cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty} 
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>
       
    )
}

export default App
