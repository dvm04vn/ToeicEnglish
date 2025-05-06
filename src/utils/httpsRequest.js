const API_DOMAIN = "http://localhost:3002/";

// Xử lý phản hồi chung
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }
  return response.json();
};

// Hàm GET
export const get = async (path) => {
  try {
    const response = await fetch(`${API_DOMAIN}${path}`);
    return await handleResponse(response);
  } catch (error) {
    console.error("GET error:", error.message);
    throw error; // Nên throw ra để bên ngoài bắt lỗi nếu cần
  }
};

// Hàm POST
export const post = async (path, data) => {
  try {
    const response = await fetch(`${API_DOMAIN}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("POST error:", error.message);
    throw error;
  }
};

// Hàm DELETE
export const del = async (path) => {
  try {
    const response = await fetch(`${API_DOMAIN}${path}`, {
      method: "DELETE",
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("DELETE error:", error.message);
    throw error;
  }
};
