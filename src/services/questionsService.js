  import { get } from "../utils/httpsRequest";

  export const getListQuestion = async (topicId) => {
    const result = await get(`questions?topicId=${topicId}`);
    return result;
  };
