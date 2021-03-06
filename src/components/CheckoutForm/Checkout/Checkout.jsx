import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { commerce } from "../../../lib/commerce";
import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

const steps = ["Shipping Address", "Payment Details"]

const Checkout = ({ cart, order, onCaptureCheckout, error, handleEmptyCart }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    
    /*STATE FORM MANAGING SHIPPING DATA*/
    const [shippingData, setShippingData] = useState({})

    /*state that is gonna be changed after the timeout ends::: compromise*/
    const [isFinished, setIsFinished] = useState(true);

    const classes =  useStyles();                               //basically importing the css styling from styles.js
    const history = useHistory();
    
    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: "cart" });
                console.log("Item Token:", token);

                setCheckoutToken(token);
            } catch (error) {
                console.log(error);
                //history.pushState("/")
            }
        }

        generateToken();
    }, [cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)            //used to go forward on the checkout section
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)            //used to go backwards on the checkout section

    const next = (data) => {
        setShippingData(data);
        
        nextStep();
    }

    /* To stop the backend from loading for ever, we will introduce 
    * a time out to show that the transaction has been successful
    */
    const timeout = () => {
        setTimeout(() => {
            //whats gonna happen when the time out ends? well...
            setIsFinished(true);
            <div className={classes.spinner}>
            <CircularProgress />
            </div>
        }, 3000)
    }

    //console.log("generate: ");
    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">
                    Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}
                </Typography>
                <Divider className={classes.divider}/>
                <Typography variant="subtitle2">
                    Order ref: {order.customer_reference}
                </Typography>
            </div>
            <br/>
            <Button component={Link} to="/" variant="outlined">Back To Home</Button>
        </>
    ) : isFinished ? (
        <>
            <div>
                <Typography variant="h5">
                    Thank you for your purchase
                </Typography>
                <Divider className={classes.divider}/>
                
            </div>
            <br/>
            <Button component={Link} to="/" variant="outlined" onClick={handleEmptyCart}>Back To Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )

    if(error) {
        <>
            <Typography variant="h5">
                Error: {error}
            </Typography>
            <br/>
            <Button component={Link} to="/" variant="outlined">Back To Home</Button>
        </>
    }

    const Form = () => activeStep === 0 
        ? <AddressForm checkoutToken={checkoutToken} next={next} /> 
        : <PaymentForm 
            shippingData={shippingData} 
            checkoutToken={checkoutToken} 
            backStep={backStep} 
            onCaptureCheckout={onCaptureCheckout}
            nextStep={nextStep}
            timeout={timeout}
        />
    return (
        <>
        <CssBaseline/>
            <div className={classes.toolbar} />  
            <main className={classes.layout} >
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
