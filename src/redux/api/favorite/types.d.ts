/* eslint-disable @typescript-eslint/no-unused-vars */
namespace FAVORITE {
  type GetFavoriteResponse = {
    productName: string;
    quantity: number | null;
    price: number | null;
    photoUrl: string;
    _id: string;
    __v: number;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    product: any;
  }[];
  type GetFavoriteRequest = void;

  type PostFavoriteResponse = {
    productName: string;
    quantity: number | null;
    price: number | null;
    photoUrl: string;
    _id: string;
    __v: number;
  }[];
  type PostFavoriteRequest = {
    id: string;
    productName: string;
    quantity: number | null;
    price: number | null;
    photoUrl: string;
  };
}
