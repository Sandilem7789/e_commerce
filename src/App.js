import React from 'react'

import {Products, Navbar } from "./components";         //file that makes this possible: ./components/index.js

const App = () => {
    return (
        <div>
            <Navbar />
            <Products />
        </div>
    )
}

export default App
