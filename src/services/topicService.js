const API_URL = "http://localhost:3002"; // Kiểm tra URL này

// Lấy 1 chủ đề theo id
export const getTopic = async (id) => {
  const response = await fetch(`${API_URL}/topics/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

// ✅ Lấy danh sách tất cả các chủ đề
export const getListTopic = async () => {
  const response = await fetch(`${API_URL}/topics`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

