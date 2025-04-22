import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Auth from "../../components/Auth";

import classNames from "classnames/bind";
import styles from "./HomeLayout.module.scss";

const cx = classNames.bind(styles);

function HomeLayout({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleOnAuth = (is_login) => {
    setIsAuth(true);
    setIsLogin(is_login);
};

const handleClose = () => {
  setIsAuth(false);
};

  return (
    <div className={cx("layout")}>
      <div className={cx("wrapper")}>
        <Header isLogin={!!localStorage.getItem("user")} handleAuth={handleOnAuth} />

        <div className={cx("content-wrapper")}>
          <Sidebar />
          <main className={cx("main-content")}>{children}</main>
        </div>

        {isAuth && (
          <div className={cx("auth")}>
            <Auth is_login={isLogin} handleOnClose={handleClose} />
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default HomeLayout;