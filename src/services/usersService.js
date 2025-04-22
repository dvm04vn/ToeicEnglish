import { get } from "../utils/httpsRequest";

// Login bằng email + password
export const login = async (email, password) => {
  const query = `users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
  const users = await get(query);
  return users.length > 0 ? users[0] : null;
};

// Lấy user dựa vào "token" (ở đây token là user.id)
export const getUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const users = await get(`users?id=${token}`);
  return users.length > 0 ? users[0] : null;
};
