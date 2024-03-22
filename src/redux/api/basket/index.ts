import { api as index } from "..";
const api = index.injectEndpoints({
  endpoints: (build) => ({
    getBasket: build.query<BASKET.GetBasketResponse, BASKET.GetBasketRequest>({
      query: () => ({
        url: "/basket",
        method: "GET",
      }),
      providesTags: ["basket"],
    }),
    postBasket: build.mutation<
      BASKET.PostBasketResponse,
      BASKET.PostBasketRequest
    >({
      query: (id) => ({
        url: `basket/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["basket"],
    }),
    patchBasket: build.mutation({
      query: ({ id, newProducts }) => ({
        url: `product-buy/${id}`,
        method: "PATCH",
        body: newProducts,
      }),
      invalidatesTags: ["basket"],
    }),
  }),
});
export const {
  useGetBasketQuery,
  usePostBasketMutation,
  usePatchBasketMutation,
} = api;
