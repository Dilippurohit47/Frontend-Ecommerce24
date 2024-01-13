import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllProductsResponse,
  CategoriesResponse,
  NewProductRequest,
  ProductsResponse,
  SearchProductsRequest,
  SearchProductsResponse,
  deleteProductRequest,
  messageResponse,
  updateProductRequest,
} from "../../types/api-types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductsResponse, string>({
      query: () => "latest",
      providesTags: ["product"],
    }),
    allProducts: builder.query<AllProductsResponse, string>({
      query: (id) => `admin-products?id=${id}`,
      providesTags:["product"],
    }),
    categoryProduct: builder.query<AllProductsResponse, string>({
      query: (category) => `${category}`,
      providesTags:["product"],
    }),

    categories: builder.query<CategoriesResponse, string>({
      query: () => `categories`,
      providesTags:["product"],

    }),searchProducts: builder.query<
      SearchProductsResponse,
      SearchProductsRequest
    >({
      query: ({ price, search, sort, category, page }) => {
        let base = `all?search=${search}&page=${page}`;

        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&catgeory=${category}`;

        return base;
      },
      providesTags:["product"],

    }),


    ProductsDetails: builder.query<ProductsResponse, string>({
      query: (id) => id,
      providesTags:["product"],
    }),

    newProduct: builder.mutation<messageResponse, NewProductRequest>({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation<messageResponse, updateProductRequest>({
      query: ({ formData, userId , productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation<messageResponse, deleteProductRequest>({
      query: ({  userId , productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
     
      }),
      invalidatesTags: ["product"],
    }),




    //end
  }),

});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
useNewProductMutation,
useProductsDetailsQuery,
useDeleteProductMutation,
useUpdateProductMutation,
useCategoryProductQuery

} = productApi;
