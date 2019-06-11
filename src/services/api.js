import axios from "axios";
import store from "../store";

const api = axios.create({
  baseURL: "https://ely-backend.herokuapp.com/"
});

api.interceptors.request.use(config => {
  const { token } = store.getState().auth;
  const { active: list } = store.getState().lists;

  const headers = { ...config.headers };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (list) {
    headers.LIST = list.slug;
  }

  return { ...config, headers };
});

export default api;
