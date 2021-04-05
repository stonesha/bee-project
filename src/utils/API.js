import axios from "axios";

export default axios.create({
  baseURL: "https://bee-cors-proxy.herokuapp.com/https://bee-webserver.herokuapp.com",
  responseType: "json"
});
