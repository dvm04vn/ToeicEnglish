import { get, post } from "../utils/httpsRequest";

// Login bằng email + password
export const login = async (email, password) => {
  try {
    const users = await get(`users?email=${encodeURIComponent(email)}`);
    const user = users.find(u => u.password === password); // kiểm tra password phía client

    if (!user) return null;

    localStorage.setItem("token", user.id);
    return user;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};

// Register: tạo user mới
export const register = async ({ fullName, email, password }) => {
  const newUser = {
    fullName,
    email,
    password,
    token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${password}.secretkey`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return await post("users", newUser); // Sending the POST request to create a new user
};

// Get user theo id (token = id)
export const getUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const users = await get(`users?id=${token}`);
  return users.length > 0 ? users[0] : null;
};
