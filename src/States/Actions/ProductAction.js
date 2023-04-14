import * as api from "../Api/index";
import {
  getProductStarts,
  getProductSuccess,
  getProductFailure,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../Redux/productRedux";

export const getAllProducts = () => async (dispatch) => {
  dispatch(getProductStarts());
  try {
    const { data } = await api.fetchAll();
    dispatch(getProductSuccess(data));
  } catch (error) {
    dispatch(getProductFailure(error.response.data.message));
    console.log(error.response);
  }
};
export const create = (form) => async (dispatch) => {
  try {
    const { data } = await api.create(form);
    dispatch(createProduct(data));
  } catch (error) {
    console.log(error.response.data.message);
  }
};
export const deleteItem = (id) => async (dispatch) => {
  try {
    await api.deleteItem(id);
    dispatch(deleteProduct(id));
  } catch (error) {
    console.log(error);
  }
};
export const updateItem = (id, form) => async (dispatch) => {
  try {
    const { data } = await api.updateItem(id, form);
    console.log(data);
    dispatch(updateProduct(data));
  } catch (error) {
    console.log(error);
  }
};
