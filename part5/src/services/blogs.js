import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const getAll = async () => {
  const blogs = await axios.get(baseUrl);
  return blogs.data;
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
}

const create = async (newObject) => {
  console.log("token:", token)
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
}

export default {getAll, create, setToken};
