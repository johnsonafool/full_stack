import axios from "axios";
// const baseUrl = "http://localhost:3001/api/notes";
const baseUrl = "/api/notes";

// Let's fix creating new notes so it works with the backend.
// This means adding the token of the logged-in user to the Authorization header of the HTTP request.
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);

  return request.then((response) => response.data);
};

// const create = (newObject) => {
//   const request = axios.post(baseUrl, newObject);
//   return request.then((response) => response.data);
// };

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, update, setToken };
