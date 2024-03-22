import { useGetFavoriteQuery } from "../../../redux/api/favorite";
import scss from "./Favorite.module.scss";
import heartImg from "../../../assets/heart.svg";
import { useNavigate } from "react-router-dom";
import { usePostBasketMutation } from "../../../redux/api/basket";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Favorite = () => {
  const { data, isLoading } = useGetFavoriteQuery();
  const [postBasket] = usePostBasketMutation();
  const notify = () => toast.success("Успешно добавлено В корзину!");

  const navigate = useNavigate();
  const navigateMainPage = () => {
    navigate("/");
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const basketPost = async (id: any) => {
    await postBasket(id);
    notify();
  };

  return (
    <div className="container">
      <div className={scss.buttonNavigate}>
        <button onClick={navigateMainPage}>Main page</button>
      </div>
      <div className={scss.headerTexts}>
        <p
          style={{
            textAlign: "center",
            fontFamily: "Courier New",
            fontWeight: "bold",
            fontSize: "17px",
          }}
        >
          Избранные
        </p>
        <p style={{ fontFamily: "Courier New" }}>
          Здесь собраны понравившиеся Вам модели.
        </p>
      </div>
      {isLoading ? (
        <h1
          style={{
            textAlign: "center",
            fontFamily: "Courier New",
            fontWeight: "bold",
          }}
        >
          Loading . . .
        </h1>
      ) : (
        <div className={scss.aside}>
          {data?.map((item) => (
            <div className={scss.render} key={item._id}>
              {item.product && item.product.photoUrl && (
                <>
                  <img
                    className={scss.mainImg}
                    src={item.product.photoUrl}
                    alt="Product"
                  />
                  <div className={scss.heart}>
                    <p>NEW NOW</p>
                    <img src={heartImg} alt="" />
                  </div>

                  <p>{item.product.productName}</p>
                  <p>{item.product.quantity}:шт</p>
                  <p>{item.product.price}:сом</p>
                  <button onClick={() => basketPost(item.product._id)}>
                    Добавить в корзину
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Favorite;
