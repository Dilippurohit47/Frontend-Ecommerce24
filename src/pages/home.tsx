import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-cart";
import { useLatestProductsQuery } from "../redux/api/productApi";
import { addToCart } from "../redux/reducer/cartReducer";
import { cartitems } from "../types/types";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");

const dispatch = useDispatch();

  const addToCartHandler = (cartItem : cartitems) => {
    if(cartItem.stock < 1) return toast.error("out of stock");

    dispatch(addToCart(cartItem));
    toast.success("item added to cart ")
  };


  if (isError) toast.error("Cannot fetch the Products ");


  console.log(data)

  return (
    <div className="home">
      <section></section>

      <h1>
        Latest Products{" "}
        <Link to="/search" className="find-more">
          More
        </Link>
      </h1>
      <main>
        {isLoading ? (
      <>   
       <Skeleton width="18.75rem" />
       <Skeleton width="18.75rem" />
       <Skeleton width="18.75rem" />
       <Skeleton width="18.75rem" />
       <Skeleton width="18.75rem" />
       <Skeleton width="18.75rem" />
      
      </>
        ) : (
          data?.products.map((i) => (

            
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
              photo={i.photo}
              category={i.category}
            />



          ))
        )}
      </main>
    </div>
  );
};

export default Home;
