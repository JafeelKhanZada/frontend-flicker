import axios from "axios";
const useFetch = axios.create({
  baseURL: "https://backend-flicker.vercel.app/api/",
});
useFetch.interceptors.request.use(
  async (config) => {
    config.header = config.headers;
    if (localStorage.getItem("TOKEN")) {
      config.headers.Authorization = `Bearer ${JSON.parse(
        localStorage.getItem("TOKEN")
      )}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

useFetch.interceptors.response.use(function (response) {
  if (response.status === 401) {
  }
  return response;
});
export { useFetch };
//
