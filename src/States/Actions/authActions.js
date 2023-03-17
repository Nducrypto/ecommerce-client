import * as api from "../Api/index";
import { loginFailure, loginStart, loginSuccess } from "../Redux/userRedux";

export const SignIn = (formAuth, navigate) => async (dispatch) => {
  dispatch(loginStart());

  try {
    const { data } = await api.login(formAuth);
    dispatch(loginSuccess(data));

    navigate("/");
  } catch (error) {
    dispatch(loginFailure(error.message));
    console.log(error.message);
  }
};

export const register = (formAuth, navigate) => async (dispatch) => {
  try {
    const { data } = await api.register(formAuth);

    dispatch(loginSuccess(data));

    navigate("/");
  } catch (error) {
    dispatch(loginFailure(error));

    console.log(error);
  }
};
