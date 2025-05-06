import React, { useState } from "react";
import { register } from "../../../services/usersService";
import Button from "../../Button";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await register(email, password,fullName);
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
      <h2>Đăng Kí</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nhập họ và tên..."
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
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
        <Button type="submit">Đăng kí</Button>
      </form>
    </div>
  );
}

export default Register;
