import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { getUser } from "../../../services/usersService";
import Avatar from "./components/Avatar";
import Image from "../../../components/Image";
import images from "../../../assets/index";
import "./Header.scss";
import Mylearn from "./components/Mylearn";

const defaultFN = () => {};

function Header({ handleAuth = defaultFN }) {
  const [user, setUser] = useState(null);
  const [isToken, setIsToken] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Fetch user info when location changes
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsToken(true);
        try {
          const result = await getUser();
          if (result) {
            setUser(result);
          }
        } catch (error) {
          console.error("Lỗi lấy thông tin người dùng:", error);
          localStorage.removeItem("token");
          setUser(null);
          setIsToken(false);
          setError("Không thể lấy thông tin người dùng. Vui lòng thử lại.");
        }
      } else {
        setUser(null);
        setIsToken(false);
      }
    };

    fetchUser();
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsToken(false);
    // handleAuth(true);
    // Reset auth state in parent
    navigate("/");
  };

  return (
    <div className="header-layout">
      <header className="header-layout__header">
        {/* Logo */}
        <div className="header-layout__logo">
          <Link to="/">Toiec Camp</Link>
        </div>

        {/* Navigation Menu */}
        {isToken && (
          <nav className="menu">
            <ul>
              {[
                { path: "/topic", label: "Topic" },
                { path: "/answers", label: "Answers" },
              ].map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive ? "menu__link menu__link--active" : "menu__link"
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Actions (Login / User Info) */}
        <div className="_action">
          {isToken ? (
            <div className="portal">
              {/* My Courses */}
              <Mylearn>
                <button className={"myLearn-btn"} aria-describedby="">
                  KHóa Học Của tôi
                </button>
              </Mylearn>

              {/* Notifications */}
              <div className="notification">
                <button className="notification-btn">
                  {/* Add notification icon here if needed */}
                </button>
              </div>

              {/* User Avatar */}
              <div className="avatar">
                <Avatar>
                  <button className="avatar-btn">
                    <Image
                      className="avatar-img"
                      src={user?.profile?.avatar || images.noImage}
                      alt={user?.profile?.name || "avatar"}
                    />
                  </button>
                </Avatar>
              </div>

              {/* Logout */}
              <Button primary onClick={handleLogout}>
                Đăng Xuất
              </Button>
            </div>
          ) : (
            <>
              <Button outlineText onClick={() => handleAuth(false)}>
                Đăng Ký
              </Button>
              <Button primary text onClick={() => handleAuth(true)}>
                Đăng Nhập
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default Header;
