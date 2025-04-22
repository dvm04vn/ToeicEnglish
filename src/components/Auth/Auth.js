import classNames from "classnames/bind";
import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

import styles from "./Auth.module.scss";
import Login from "./Login";
import Register from "./Register";
import MenuOther from "./MenuOther";

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Auth({ is_login, handleOnClose = defaultFn }) {
  const [isLogin, setIsLogin] = useState(is_login);

  // Chuyển đổi giữa đăng nhập và đăng ký
  const handleOnConvert = () => {
    setIsLogin(!isLogin);
  };

  // // Close modal after successful login/register
  // const handleSuccessfulAuth = () => {
  //   handleOnClose(); // Close modal after authentication is successful
  // };

  return (
    <div
      className={cx("wrapper", { is_login: isLogin, is_register: !isLogin })}
    >
      <div className={cx("header")}>
        <h3>
          {isLogin ? "Đăng Nhập Vào Toiec Camp" : "Đăng Kí Vào Toiec Camp"}
        </h3>
        <button className={cx("close")} onClick={handleOnClose}>
          <IoIosCloseCircle />
        </button>
      </div>
      <div className={cx("body")}>
        <div className={cx("content")}>
          {isLogin ? <Login /> : <Register />}
        </div>
        <div className={cx('other')}>
                    <MenuOther />
                </div>
      </div>
      <div className={cx("footer")}>
        <div className={cx("convert")}>
          <p>{isLogin ? "Bạn Không Có tài khoản?" : "Bạn Đã Có Tài Khoản?"}</p>
          <button onClick={handleOnConvert}>
            {isLogin ? "Đăng Kí" : "Đăng Nhập"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
