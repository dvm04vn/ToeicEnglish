import { post } from "../utils/httpsRequest"

export const createAnswer = async(options) => {
    const result = await post(`answers`, options);
    return result;
}