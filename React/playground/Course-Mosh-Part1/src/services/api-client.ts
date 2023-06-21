import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "xxxxxx",
  headers: {
    "api=key": "xxxxxx",
  },
});

export { CanceledError };
