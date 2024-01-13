import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/cart-items";
import { addToCart, calculatePrice, discountApplied, removeCartItem } from "../redux/reducer/cartReducer";
import { cartReducerInitialState } from "../types/reducer-type";
import { cartitems } from "../types/types";
import axios from "axios";
import { server } from "../redux/reducer/store";


const Cart = () => {
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector(
      (state: { cartReducer: cartReducerInitialState }) => state.cartReducer
    );

  const [couponCode, setcouponCode] = useState<string>("ddd");
  const [isvalid, setisvalid] = useState<boolean>(false);

const dispatch = useDispatch();
  const incrementHandler = (cartItem : cartitems) => {
    if(cartItem.quantity >= cartItem.stock) return toast.error("stock is epmty please wait for some days ")

    dispatch(addToCart({...cartItem , quantity : cartItem.quantity +1}));
  };

  const decrementHandler = (cartItem : cartitems) => {
    if(cartItem.quantity <= 1) return toast.error("quantity cannot be in negative ")

    dispatch(addToCart({...cartItem , quantity : cartItem.quantity -1}));
  };
  const removeHandler = (productId : string) => {

    dispatch(removeCartItem(productId));
  };





  useEffect(() => {

const { token:cancelToken , cancel} = axios.CancelToken.source();

    const timeoutId = setTimeout(() => {
        setisvalid(true);
axios.get(`${server}/api/v1/payment/discount?coupon=${couponCode}`,{cancelToken })
.then((res)=>{
dispatch(discountApplied(res.data.discount))
  setisvalid(true);
  dispatch(calculatePrice())

  console.log(res.data)

})
.catch(()=>{
dispatch(discountApplied(0))
dispatch(calculatePrice())

  setisvalid(false);


})
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      cancel();
      setisvalid(false);
    };
  }, [couponCode]);




  useEffect(()=>{
    dispatch(calculatePrice())
  },[cartItems])



  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, index) => <CartItem incrementHandler={incrementHandler}  decrementHandler={decrementHandler} 
          removeHandler={removeHandler} key={index} cartItem={i} />)
        ) : (
          <h1>No Items added</h1>
        )}
      </main>
      <aside>
        <p>Subtotal : ₹{subtotal}</p>
        <p>shippingCharges : ₹{shippingCharges}</p>
        <p>tax : ₹{tax}</p>
        <p>
          Discount : <em>-₹{discount}</em>
        </p>
        <p>
          <b>Total :₹{total} </b>
        </p>

        <input
          type="text"
          value={couponCode}
          placeholder={couponCode}
          onChange={(e) => setcouponCode(e.target.value)}
        />
        {couponCode &&
          (isvalid ? (
            <span className="green">
              ₹{discount} of using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />{" "}
            </span>
          ))}

        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
