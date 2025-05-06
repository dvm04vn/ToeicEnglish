import { useState } from "react";
import { login } from "../../../services/usersService";
// import { useNavigate } from "react-router-dom";
import "./Login.scss";
import Button from "../../Button";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    console.log(user)
    if (user) {
      localStorage.setItem("token", user.token); 
      
      // console.log(user.id)
      window.location.reload();
      // hoặc navigate("/") nếu muốn chuyển hướng thay vì reload
      // navigate('/')
    } else {
      setError("Sai email hoặc mật khẩu");
    }
  };

  return (
    <div className="auth-form">
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        {/* <button >Đăng Nhập</button> */}
        <Button  type="submit">Đăng Nhập</Button>
      </form>
    </div>
  );
}

export default Login;
