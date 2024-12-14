import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Donation.css';

const stripePromise = loadStripe('your-stripe-publishable-key');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post('http://localhost:6000/donate', { amount });
        const { clientSecret } = data;

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (paymentResult.error) {
            setMessage(`Payment failed: ${paymentResult.error.message}`);
        } else {
            setMessage('Payment successful! Thank you for your donation.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder="Amount (USD)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Donate
            </button>
            {message && <p>{message}</p>}
        </form>
    );
};

const Donation = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default Donation;
