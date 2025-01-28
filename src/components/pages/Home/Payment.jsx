import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import {useSearchParams } from 'react-router-dom';
import { useSession } from '../../../providers/SessionProvider';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const [searchParams] = useSearchParams();
    const {sessionData} = useSession();
    const sessionId = searchParams.get("sessionId");
    const amount = searchParams.get("amount");
   
    return (
        <div className='w-1/2 mx-auto mt-12 mb-36'>
            <h2 className='text-2xl font-medium mt-12 mb-12 text-center'>Payment</h2>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm  sessionId={sessionId} amount={amount} session={sessionData} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;