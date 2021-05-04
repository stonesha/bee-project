import axios from "axios";

//Axios base creation of the connection link
export default axios.create({
  baseURL: "https://bee-cors-proxy.herokuapp.com/https://bee-webserver.herokuapp.com",
  responseType: "json"
});
