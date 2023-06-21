import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "",
  headers: {
    "api=key": "",
  },
});

export { CanceledError };
