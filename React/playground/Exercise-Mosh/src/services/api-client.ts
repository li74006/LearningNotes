import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "44b4ebb22df34ec6b5f3c32cf3983cb0",
  },
});
