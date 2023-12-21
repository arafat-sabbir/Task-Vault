import axios from "axios";

// Create a instance to use axios functionality like baseUrl,header

const instance = axios.create({
  baseURL: "http://localhost:5000/api/"
});
const useAxios = () => {
  return instance;
};

export default useAxios;
