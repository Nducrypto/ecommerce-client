import axios from "axios";
// import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_API_URL;

// const { authData } = useSelector((state) => state.userReducer);
// console.log(authData);
const TOKEN = JSON.parse(
  JSON.parse(localStorage.getItem("persist:root"))?.userReducer
)?.authData?.token;

// const TOKEN = true;
export const publicRequest = axios.create({ baseURL: BASE_URL });
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

export const fetchAll = () => publicRequest.get("/products");
export const create = (form) => userRequest.post("/products", form);
export const deleteItem = (id) => userRequest.put(`/products/${id}`);
//    =======Auth API=====
export const login = (formAuth) => publicRequest.post("/users/login", formAuth);
export const register = (formAuth) =>
  publicRequest.post("/users/register", formAuth);

// ========USERS API=======
