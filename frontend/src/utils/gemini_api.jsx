import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/gemini/",
});

export const askGemini = async (prompt) => {
    try {
      let response = await api.get("/prompt/", {
        params: { prompt: prompt }, // Send prompt as query parameter
      });
      if (response.status === 200) {
        let { reply } = response.data;
        return reply;
      }
    } catch (error) {
      // Log detailed error information
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("API Error:", {
          message: error.message,
          status: error.response.status,
          data: error.response.data,
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.error("API Error: No response received", {
          message: error.message,
          request: error.request,
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("API Error: Request setup error", {
          message: error.message,
        });
      }
      return null;
    }
};
