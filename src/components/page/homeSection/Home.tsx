/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useFormik } from "formik";
import Modal from "../../modal/Modal";
import filterImg from "../../../assets/filter.svg";
import scss from "./Home.module.scss";
import heartImg from "../../../assets/Vector.svg";
import deleteImg from "../../../assets/tree.svg";
import greenimg from "../../../assets/greenHeart.svg";
import editImg from "../../../assets/two.svg";
import { useNavigate } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  usePostProductsMutation,
} from "../../../redux/api/product";
import homeShreme from "../../utils/validation/Home";
import { useCreateFavoriteMutation } from "../../../redux/api/favorite";
import { usePostBasketMutation } from "../../../redux/api/basket";
import { usePutProductsMutation } from "../../../redux/api/product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { data, isLoading, refetch } = useGetProductsQuery();
  const [deletePost] = useDeleteProductMutation();
  const [postProducts] = usePostProductsMutation();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [postFavorite] = useCreateFavoriteMutation();
  const [basketPost] = usePostBasketMutation();
  const [updateProduct] = usePutProductsMutation();
  const [isEdit, setIsEdit] = useState(null);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [productName, setProductName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const notify = () => toast.success("Успешно добавлено В корзину!");
  const productAdd = () => toast.success("Успешно добавлено");

  const handleSave = async (id: string) => {
    const newData = {
      productName: productName,
      price: price,
      quantity: quantity,
    };
    await updateProduct({ newData, id });
    setIsEdit(null);
  };

  const handleEdit = (item: any) => {
    setPhotoUrl(item.photoUrl);
    setPrice(item.price);
    setQuantity(item.quantity);
    setProductName(item.productName);
    setIsEdit(item._id);
  };

  const formik = useFormik({
    initialValues: {
      photoUrl: "",
      quantity: 0,
      price: 0,
      productName: "",
    },
    validationSchema: homeShreme,
    onSubmit: async (values, { resetForm }) => {
      const response = await postProducts({
        productName: values.productName,
        price: values.price,
        quantity: values.quantity,
        photoUrl: values.photoUrl,
      });
      modalClose();
      resetForm();
      productAdd();
      console.log(response);
    },
  });
  const basketCards = async (id: any) => {
    await basketPost(id);
    notify();
  };

  const favoriteCards = async (id: any) => {
    await postFavorite(id);
    refetch();
  };

  const deleteData = async (id: any) => {
    await deletePost(id);
  };

  const clearUser = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  const modalIsOpen = () => {
    setModal(true);
  };

  const modalClose = () => {
    setModal(false);
  };

  return (
    <div className={scss.Home}>
      <div className="container">
        <div className={scss.addProducts} onClick={modalIsOpen}>
          <p>Фильтры</p>
          <img src={filterImg} alt="Filter" />
        </div>
        <div className={scss.buttonExit}>
          <button onClick={clearUser}>Exit</button>
        </div>
        <Modal isOpen={modal} onClose={modalClose}>
          <form onSubmit={formik.handleSubmit}>
            <div className={scss.modal}>
              <p>
                Добавить новую <br /> позицию
              </p>
              <span onClick={modalClose}>&#10006;</span>
            </div>
            <div className={scss.inputs}>
              <input
                type="text"
                name="productName"
                placeholder="productName"
                value={formik.values.productName}
                onChange={formik.handleChange}
              />
              {formik.touched.productName && formik.errors.productName ? (
                <div>{formik.errors.productName}</div>
              ) : null}
              <input
                name="quantity"
                type="number"
                placeholder="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
              />
              {formik.touched.quantity && formik.errors.quantity ? (
                <div>{formik.errors.quantity}</div>
              ) : null}

              <input
                type="number"
                name="price"
                placeholder="price"
                value={formik.values.price}
                onChange={formik.handleChange}
              />
              {formik.touched.price && formik.errors.price ? (
                <div>{formik.errors.price}</div>
              ) : null}
              <input
                type="text"
                name="photoUrl"
                placeholder="photoUrl"
                value={formik.values.photoUrl}
                onChange={formik.handleChange}
              />
              {formik.touched.photoUrl && formik.errors.photoUrl ? (
                <div>{formik.errors.photoUrl}</div>
              ) : null}
            </div>
            <div className={scss.buttons}>
              <button onClick={modalClose} className={scss.buttonOne}>
                Отменить
              </button>
              <button className={scss.buttonTwo} type="submit">
                Сохранить
              </button>
            </div>
          </form>
        </Modal>
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
                {isEdit === item._id ? (
                  <>
                    <div className={scss.sectionEdit}>
                      <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                      <input
                        type="text"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="img"
                        value={quantity}
                        onChange={(e) => setQuantity(+e.target.value)}
                      />
                      <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(+e.target.value)}
                      />
                      <button
                        className={scss.buttonEdit}
                        onClick={() => handleSave(item._id)}
                      >
                        save
                      </button>
                      <button
                        className={scss.buttonEdit}
                        onClick={() => setIsEdit(null)}
                      >
                        cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <img src={item.photoUrl} alt="Product" />
                    <div className={scss.texts}>
                      <p>NEW NOW</p>
                      {item.isFavorite ? (
                        <>
                          <img
                            src={greenimg}
                            alt=""
                            className={scss.img}
                            onClick={() => favoriteCards(item._id)}
                          />
                        </>
                      ) : (
                        <>
                          <img
                            onClick={() => favoriteCards(item._id)}
                            className={scss.img}
                            src={heartImg}
                            alt="Heart"
                          />
                        </>
                      )}
                    </div>
                    <div className={scss.deleteScss}>
                      <p>{item.productName}</p>
                      <img
                        onClick={() => deleteData(item._id)}
                        src={deleteImg}
                        alt="image"
                      />
                    </div>
                    <p>{item.quantity}:шт</p>
                    <div className={scss.editBar}>
                      <p>{item.price}:сом</p>
                      <img
                        onClick={() => handleEdit(item)}
                        src={editImg}
                        alt="image"
                      />
                    </div>
                    <button onClick={() => basketCards(item._id)}>
                      Добавить в корзину
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
