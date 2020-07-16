import React from 'react';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = () => {
    const [paymentError, setPaymentError] = useState(null)
    const [paymentMethods, setPaymentMethod] = useState(null)
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        if (error) {
            setPaymentError(error.message)
            setPaymentMethod(null)
        } else {
            setPaymentMethod(paymentMethod)
            setPaymentError(null)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <br />
            {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
            <br />
            {paymentMethods && <p style={{ color: 'green' }}>Payment success</p>}
            <button type="submit" disabled={!stripe}>Pay </button>
        </form>
    );
};
export default CheckoutForm;