import { get } from "../utils/httpsRequest";

// Lấy 1 chủ đề theo id
export const getTopic = async (id) => {
  const result = await get(`topics/${id}`);
  return result;
};

// ✅ Lấy danh sách tất cả các chủ đề
export const getListTopic = async () => {
  const result = await get(`topics`);
  return result;
};
