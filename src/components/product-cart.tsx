import { FaPlus } from "react-icons/fa";
import { server } from "../redux/reducer/store";
import { cartitems } from "../types/types";

type ProductProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  handler:(cartItem: cartitems) => string | undefined;
};
const ProductCard = ({
  productId,
  price,
  name,
  photo,
  stock,
  handler,
  category,
}: ProductProps) => {
 
  return (
    <div className="productcard">
      
      <img src={`${server}/${photo}`} alt={`image of ${category}`} />
      <p>{name}</p>
      <span>₹{price}</span>

      <div onClick={() => handler({  productId,
  price,
  name,
  photo,
  stock,quantity  :1,})}>
        <button>
          <FaPlus />
        </button>
        a
      </div>
    </div>
  );
};

export default ProductCard;
