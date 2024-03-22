import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<
      PRODUCT.GetProductsResponse,
      PRODUCT.GetProductsRequest
    >({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    postProducts: build.mutation<
      PRODUCT.PostProductResponse,
      PRODUCT.PostProductRequest
    >({
      query: (newProducts) => ({
        url: "/products",
        method: "POST",
        body: newProducts,
      }),
      invalidatesTags: ["products"],
    }),
    putProducts: build.mutation({
      query: ({ id, newData }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: newData,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  usePostProductsMutation,
  usePutProductsMutation,
  useDeleteProductMutation,
} = api;
