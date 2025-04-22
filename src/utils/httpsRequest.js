const API_DOMAIN = "http://localhost:3002/";

export const get = async (path) => {
  const url = API_DOMAIN + path;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("GET request failed");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("GET error:", error);
    return null;
  }
};

export const post = async (path, data) => {
  const url = API_DOMAIN + path;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("POST request failed");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("POST error:", error);
    return null;
  }
};

export const del = async (path) => {
  const url = API_DOMAIN + path;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("DELETE request failed");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("DELETE error:", error);
    return null;
  }
};
