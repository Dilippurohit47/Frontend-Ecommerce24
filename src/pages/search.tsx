import React, { useState } from "react";
import ProductCard from "../components/product-cart";
import {
  useCategoriesQuery,
  useCategoryProductQuery,
  useSearchProductsQuery,
} from "../redux/api/productApi";
import { Customerror } from "../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../components/loader";
import Products from "./admin/products";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import { cartitems } from "../types/types";

const Search = () => {
  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");

  const [search, setsearch] = useState("");
  const [sort, setsort] = useState("");
  const [category, setcategory] = useState("");
  const [maxPrice, setmaxPrice] = useState(100000);
  const [page, setpage] = useState(1);

  const { isLoading: productLoading, data: searchedData,isError :productIsError , error : productError } =
    useSearchProductsQuery({
      search,
      sort,
      page, 
      category,

      price: maxPrice,
    });


    const { data:categoryProduct , isLoading } = useCategoryProductQuery(category);
    console.log(categoryProduct)

const dispatch = useDispatch();


  const addToCartHandler = (cartItem : cartitems) => {
    if(cartItem.stock < 1) return toast.error("out of stock");

    dispatch(addToCart(cartItem));
    toast.success("item added to cart ")
  };

  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  if (isError) {
    const err = error as Customerror;
    toast.error(err.data.message);
  }

  if (productIsError) {
    const err = productError as Customerror;
    toast.error(err.data.message);
  }



  const SkeletonLength = searchedData?.products.length;


  // console.log(SkeletonLength);
console.log(searchedData)


  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>sort</h4>
          <select value={sort} onChange={(e) => setsort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price : {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setmaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <h4>category</h4>
          <select value={category} onChange={(e) => setsort(e.target.value)}>
            <option value="">ALL</option>
            {!loadingCategories &&
              categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {" "}
                  {i.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />


    {
      productLoading ? (

        <Skeleton length={SkeletonLength}/>
        

      ) :(
        <div className="search-product-list">
        {
         searchedData?.products.map((i)=>(

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
        }
       </div>
      )


    }

      {
       searchedData && searchedData?.totalPage > 1 && (
          <article>
          <button
            disabled={!isPrevPage}
            onClick={() => setpage((prev) => prev - 1)}
          >
            Prev
          </button>
          <span>
            {page} of {searchedData?.totalPage}
          </span>
          <button
            disabled={!isNextPage}
            onClick={() => setpage((prev) => prev + 1)}
          >
            Next
          </button>
        </article>
        )
      }
      </main>
    </div>
  );
};

export default Search;
