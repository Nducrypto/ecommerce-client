import axios from "axios";

const TOKEN = JSON.parse(localStorage.getItem("persist:root"))?.token;
console.log(TOKEN);

// const userReducer = JSON.parse(
//   localStorage.getItem("persist:root")
// )?.userReducer;
// const authData = JSON.parse(userReducer).authData;
// const TOKEN = authData && JSON.parse(authData).token;

// console.log(TOKEN);
// const TOKEN = true;
export const publicApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
export const userApi = axios.create({ baseURL: process.env.REACT_APP_API_URL });
// headers: { token: `Bearer ${TOKEN}` },

export const fetchAll = () => publicApi.get("/products");
export const create = (form) => userApi.post("/products", form);
export const deleteItem = (id) => userApi.put(`/products/${id}`);
//    =======Auth API=====
export const login = (formAuth) => publicApi.post("/users/login", formAuth);
export const register = (formAuth) =>
  publicApi.post("/users/register", formAuth);

// ========USERS API=======
