import axios from "axios";
import { toast } from "react-toastify";
import logService from "./logService";

axios.defaults.baseURL = `https://evening-eyrie-15780.herokuapp.com/api`;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logService.log(error);
    toast.error("An unexpected error occurred");
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
