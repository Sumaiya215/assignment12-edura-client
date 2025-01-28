import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const CheckoutForm = ({ sessionId,amount,session }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    console.log(session);
    // const {
    //     _id,
    //     sessionTitle,
    //     tutorName,
    //     tutorEmail,
    //     sessionDescription,
    //     registrationStartDate,
    //     registrationEndDate,
    //     classStartDate,
    //     classEndDate,
    //     sessionDuration,
    //     registrationFee
    // } = session;

    const [transactionId, setTransactionId] = useState('')
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', {
            amount
        })
            .then(res => {
                console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, amount])


    // checkout handle
    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!stripe || !elements) {

            return;
        }


        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('payment error', error);
            setError(error.message, error)
        } else {
            console.log('payment method', paymentMethod);
            setError('')
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);
            }
        }

        // save payment in db
        const paymentInfo = {
            sessionId,
            sessionTitle: session. sessionTitle,
            tutorName: session.tutorName,
            tutorEmail: session.tutorEmail,
            sessionDescription: session.sessionDescription,
            registrationStartDate: session.registrationStartDate,
            registrationEndDate: session.registrationEndDate,
            classStartDate: session.classStartDate,
            classEndDate: session.classEndDate,
            sessionDuration: session.sessionDuration,
            studentEmail: user?.email,
            price: parseInt(amount),
            status: "succeeded",
            transactionId: paymentIntent.id,
            date: new Date()
        }

        try {
            const res = await axiosSecure.post('/bookings', { paymentInfo })
            console.log("payment saved", res.data)
            toast.success("Booking Successful");
            navigate('/dashboard/view-session')
        } catch (err) {
            console.log(err)
            toast.error('Booking error')
        } finally{
            setError('')
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit"
                disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-500">{error}</p>
            {
                transactionId && <p className="text-green-600">Your transaction Id: {transactionId}</p>
            }
        </form>
    );
};

export default CheckoutForm;
