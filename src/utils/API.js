import axios from "axios";

export default axios.create({
  baseURL: "https://bee-webserver.herokuapp.com/",
  responseType: "json"
});