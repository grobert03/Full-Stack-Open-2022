import axios from "axios";

const route = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  let request = axios.get(`${route}/all`);
  return request.then((response) => response.data);
};

const find = (id) => {
  let request = axios.get(`${route}/name/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, find };
