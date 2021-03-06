import React from 'react';
import { Typography, Button, Divider } from "@material-ui/core";
import { Elements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import {loadStripe } from "@stripe/stripe-js";

/*Compromised Payment*/
import { Link } from "react-router-dom";

import Review from "./Review"

/*STRIPE PUBLIC KEY: stored in .env file, this file is gitIgnored*/
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, shippingData, backStep, onCaptureCheckout, nextStep, timeout }) => {
    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();                                                     //prevents the site to reload after a button press
        if(!stripe || !elements) return;                                            //stripe cant do anything if we do not have these!!!
        const cardElement = elements.getElement(CardElement);

        /*STRIPE API TO CREATE A PAYMENT METHOD*/
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card: cardElement });

        if(error){
            console.log(error);
        } else {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: {
                    firstname: shippingData.firstName,
                    lastname: shippingData.lastName,
                    email: shippingData.email
                },
                shipping: {
                    name: "Primary",
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry
                },
                fulfillment: { shipping_method: shippingData.shippingOption },
                payment: {
                    gateway: "stripe",
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                }
            }
            onCaptureCheckout(checkoutToken.id, orderData);
            //call timeout to finish the transaction
            timeout()
            nextStep()
        }
    }

    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: "20px 0"}}>
                Payment Method
            </Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {(elements, stripe) => (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement />
                            <br/><br/> 
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <Button variant="outlined" onClick={backStep}>Back</Button>
                                {/*disabled={!stripe}*/}
                                {/*the onClick={nextStep} on the button is a compromise*/}
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    disabled={stripe} 
                                    color="primary"
                                    component={Link}
                                    onClick={nextStep()}
                                >
                                    Pay: {checkoutToken.live.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    );
}

export default PaymentForm
