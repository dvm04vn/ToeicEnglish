const API_URL = "http://localhost:3002"; // URL của API

export const getListQuestion = async (topicId) => {
  const response = await fetch(`${API_URL}/questions?topicId=${topicId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};