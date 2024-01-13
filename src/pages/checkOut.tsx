import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useNewOrderMutation } from '../redux/api/orderApi';
import { resetCart } from '../redux/reducer/cartReducer';
import { Rootstate } from '../redux/reducer/store';
import { NewOrderRequest } from '../types/api-types';
import { responseToast } from '../utils/feature';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);


const CheckOutForm =()=> {


const { user } = useSelector((state : Rootstate) => state.userReducer)

const {
  shippingInfo,
  cartItems,
  subtotal,
  tax,
  discount,
  shippingCharges,
  total,

} = useSelector((state : Rootstate) => state.cartReducer)


//  const location = useLocation();
// const clientSecret:string | undefined = location.state;

const [newOrder] = useNewOrderMutation();


    const [isProcessing, setisProcessing] = useState<boolean>(false);
    const navigate = useNavigate();
    const stripe  = useStripe()
    const elements = useElements();
const dispatch = useDispatch();
    
     const submitHandler  = async (e:FormEvent<HTMLFormElement>) =>{
      e.preventDefault();

      const orderData:NewOrderRequest = {
        shippingInfo :shippingInfo,
      orderItems :cartItems,
        subtotal,
        tax,
        discount,
        shippingCharges,
        total,
        user : user?._id!,

      };


      if(!stripe || !elements) return;
      setisProcessing(true)

   const {paymentIntent , error}=    await stripe.confirmPayment({elements,confirmParams:{return_url:window.location.origin},redirect:"if_required",})

if(error) {
setisProcessing(false);
  return toast.error(error.message || "something went wrong");
}
if(paymentIntent.status === "succeeded") {
  const res = await newOrder(orderData);
  dispatch(resetCart());

  responseToast(res, navigate , "/orders");
}

setisProcessing(false);

    }




    return <div className='checkout-container'>
        
        <form onSubmit={submitHandler}>
            <PaymentElement/>
            <button type='submit' disabled={isProcessing}>
                {
                    isProcessing ? "processing...." :"pay"
                }
            </button>

        </form>

    </div>

}



const Checkout = () => {

  const location = useLocation();

  const clientSecret:string | undefined = location.state;

if(!clientSecret) return <Navigate to={"/shipping"} />

  return <Elements  options={
    {clientSecret,}
  } stripe={stripePromise}>
<CheckOutForm/>

  </Elements>
}

export default Checkout
