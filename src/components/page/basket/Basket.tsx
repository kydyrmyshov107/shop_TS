import {
  useGetBasketQuery,
  usePatchBasketMutation,
} from "../../../redux/api/basket";
import scss from "./Basket.module.scss";
import one from "../../../assets/one.svg";
import two from "../../../assets/two.svg";
import tree from "../../../assets/tree.svg";
import { useNavigate } from "react-router-dom";
const Basket = () => {
  const { data, isLoading } = useGetBasketQuery();
  const [patchProducts] = usePatchBasketMutation();
  const navigate = useNavigate();
  const navigateMainPage = () => {
    navigate("/");
  };

  const handlePlues = async (id: string) => {
    const newProducts = {
      quantityToDecrease: -1,
    };
    await patchProducts({ id, newProducts });
  };
  const handleMinus = async (id: string) => {
    const newProducts = {
      quantityToDecrease: +1,
    };
    await patchProducts({ id, newProducts });
  };

  return (
    <div style={{ background: "#fafafb" }}>
      <div className="container">
        <div className={scss.buttonNavigate}>
          <button onClick={navigateMainPage}>main page</button>
        </div>
        {isLoading ? (
          <>
            <h1
              style={{
                textAlign: "center",
                fontFamily: "Courier New",
                fontWeight: "bold",
              }}
            >
              Loading . . .
            </h1>
          </>
        ) : (
          <>
            <div className={scss.aside}>
              {data?.map((item) => (
                <div className={scss.mainScss} key={item._id}>
                  <div className={scss.nameProduct}>
                    <div>
                      <p>{item.product.productName}</p>
                    </div>
                    <div className={scss.imgs}>
                      <img src={one} alt="img" />
                      <img src={two} alt="" />
                      <img src={tree} alt="" />
                    </div>
                  </div>
                  <div className={scss.render}>
                    <div className={scss.firts}>
                      <img src={item.product.photoUrl} alt="image" />
                      <div className={scss.texts}>
                        <p
                          style={{
                            fontFamily: "Courier New",
                            fontWeight: "bold",
                          }}
                        >
                          Цвета в наличии
                        </p>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "13px",
                          }}
                        >
                          <p
                            style={{
                              fontFamily: "Courier New",
                              fontWeight: "bold",
                            }}
                          >
                            Размеры в наличии
                          </p>
                          <p
                            style={{
                              fontFamily: "Courier New",
                              fontWeight: "bold",
                            }}
                          >
                            XXS, XS, S, M, L, XL, XXL
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* 2 */}
                    <div className={scss.numbers}>
                      <div>
                        <h5>{item.product.quantity} шт</h5>
                        <p>Запас</p>
                      </div>
                      <div>
                        <h5>{item.product.price} Сом</h5>
                        <p>Цена</p>
                      </div>
                      <div className={scss.couters}>
                        <p onClick={() => handlePlues(item.product._id)}>+</p>
                        <p onClick={() => handleMinus(item.product._id)}>-</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Basket;
