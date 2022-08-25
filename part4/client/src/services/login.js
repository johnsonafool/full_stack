// Logging in is done by sending an HTTP POST request to server address api/login.
// Let's separate the code responsible for this request to its own module, to file services/login.js.
// We'll use async/await syntax instead of promises for the HTTP request:

import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  const res = await axios.post(baseUrl, credentials);
  return res.data;
};

export default { login };
