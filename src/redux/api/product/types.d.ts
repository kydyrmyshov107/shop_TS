/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable */
namespace PRODUCT {
  type GetProductsResponse = {
    productName: string;
    quantity: number | null;
    price: number | null;
    photoUrl: string;
    _id: string;
    __v: number;
    isFavorite: boolean;
  }[];
  type GetProductsRequest = void;

  type PostProductResponse = {
    productName: string;
    quantity: number | null;
    price: number | null;
    photoUrl: string;
    _id: string;
    __v: number;
    isInBasket: boolean;
    isFavorite: boolean;
  }[];
  type PostProductRequest = {
    productName: string;
    quantity: number | null;
    price: number | null;
    photoUrl: string;
  };

  type DeleteProductResponse = {
    productName: string;
    quantity: number | null;
    price: number | null;
    photoUrl: string;
    _id: string;
    __v: number;
  };
  type DeleteProductRequest = string;
}
