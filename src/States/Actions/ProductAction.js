import * as api from "../Api/index";
import {
  getProductStarts,
  getProductSuccess,
  getProductFailure,
  createProduct,
  deleteProduct,
} from "../Redux/productRedux";

export const getAllProducts = () => async (dispatch) => {
  dispatch(getProductStarts());
  try {
    const { data } = await api.fetchAll();
    dispatch(getProductSuccess(data));
    console.log(data);
  } catch (error) {
    dispatch(getProductFailure(error.message));
    console.log(error.message);
  }
};
export const create = (form) => async (dispatch) => {
  try {
    const { data } = await api.create(form);
    dispatch(createProduct(data));
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteItem = (id) => async (dispatch) => {
  try {
    await api.deleteItem(id);
    dispatch(deleteProduct());
  } catch (error) {
    console.log(error.message);
  }
};
