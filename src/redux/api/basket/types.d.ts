/* eslint-disable @typescript-eslint/no-unused-vars */
namespace BASKET {
  type GetBasketResponse = {
    productName: string;
    quantity: number | null;
    price: number | null;
    photoUrl: string;
    _id: string;
    __v: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    product: any;
  }[];
  type GetBasketRequest = void;

  type PostBasketResponse = {
    productName: string;
    quantity: number | null;
    price: number | null;
    photoUrl: string;
    _id: string;
    __v: number;
  }[];
  type PostBasketRequest = {
    id: string;
    productName: string;
    quantity: number | null;
    price: number | null;
    photoUrl: string;
  };
}
