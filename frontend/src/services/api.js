import axios from "axios";

const api = axios.create({
  baseURL: "http://www.elitecoinsfc.com.br/3000", // URL do seu backend
});

export default api;
