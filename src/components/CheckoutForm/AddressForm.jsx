import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";

import { commerce } from "../../lib/commerce";

import FormInput from "./CustomTextField"

const AddressForm = ({checkoutToken}) => {
    /*MANAGING FORM STATE: we are going to fetch these from the commerce.js API*/
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState("");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState("");
    const methods = useForm();              //tools to successfuly run the form


    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name}))
    
    
    /*FETCHING API METHODS*/
    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

        console.log("Shipping Countries:", countries);
        setShippingCountries(countries);
        
        /*GETTING THE COUNTRIES INTO AN ARRAY FORM*/
        setShippingCountry(Object.keys(countries)[0])

    }
    
    useEffect(() => {
        
        fetchShippingCountries(checkoutToken.id);
    }, []);
    
                                    
    return (
        <>
           <Typography variant="h6" gutterBottom>Shipping Address</Typography>
           <FormProvider {...methods}>
                <form onSubmit="" >
                    <Grid container spacing={3}>
                        <FormInput reqiured name="firstName" label="First Name" />
                        <FormInput reqiured name="LastName" label="Last Name" />
                        <FormInput reqiured name="address1" label="Address" />
                        <FormInput reqiured name="email" label="Email" />
                        <FormInput reqiured name="city" label="City" />
                        <FormInput reqiured name="zip" label="ZIP / Postal Code" />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        {/*<Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivisions</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid> */}
                    </Grid>
                </form>
           </FormProvider>
        </>
    )
}

export default AddressForm
