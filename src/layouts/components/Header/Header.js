import "./Header.scss";
import Button from "../../../components/Button";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../../../services/usersService";

const defaultFN = () => {};

function Header({ handleAuth = defaultFN }) {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const result = await getUser();
          if (result) setUser(result);
        } catch (error) {
          console.error("Lỗi lấy thông tin người dùng:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="header-layout">
      <header className="header-layout__header">
        <div className="header-layout__logo">
          <Link to='/'>Toiec Camp</Link>
        </div>

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

        <div className="_action">
          {user ? (
            <div className="portal">
              <div className="myLearn">
                <button className="myLearn-btn">Khóa Học Của Tôi</button>
              </div>
              <div className="notification">
                <button className="notification-btn">{/* icon */}</button>
              </div>
              <div className="avatar">
                <button className="avatar-btn">
                  {user?.name || "User"}
                  {/* Nếu có avatar: <img src={user.avatar} alt="avatar" /> */}
                </button>
                
                
              </div>
              <Button primary onClick = {handleLogout}>
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
    </div>
  );
}

export default Header;
