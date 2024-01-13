import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/reducer/store";
import { cartitems } from "../types/types";

type cartItemProps = {
  cartItem  :cartitems;
  incrementHandler : (cartItem : cartitems ) =>void;
  decrementHandler : (cartItem : cartitems ) =>void;
  removeHandler : (id : string ) =>void;
};

const CartItem = ({cartItem , incrementHandler ,decrementHandler ,removeHandler} : cartItemProps) => {

  const {photo , productId, name ,quantity , price} = cartItem;


  return (
    <div className="cart-item">
      <img src={`${server}/${photo}`} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>
        ₹{price}
        </span>
      </article>

      <div>
        <button onClick={() =>decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() =>incrementHandler(cartItem)}>+</button>
      </div>

      <button onClick={() =>removeHandler(productId)}>
        <FaTrash/>
      </button>
      
    </div>
  )
}

export default CartItem
