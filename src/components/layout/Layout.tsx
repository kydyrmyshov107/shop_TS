import { Route, Routes } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import HomePage from "../page/HomePage";
import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";
import scss from "./Layout.module.scss";

import Basket from "../page/basket/Basket";
import Favorite from "../page/favorite/Favorite";

const Layout = () => {
  return (
    <div className={scss.Layout}>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/basket" element={<Basket />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
