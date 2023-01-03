import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../States/Actions/authActions";
import "./login.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { loading } = useSelector((state) => state.userReducer);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form, navigate));
  };

  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <h1 className="loginTitle">SIGN IN</h1>
        <form className="form">
          <input
            className="input"
            placeholder="email"
            name="email"
            onChange={handleChange}
          />

          <input
            className="input"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <button
            className="loginButton"
            onClick={handleSubmit}
            disabled={loading}
          >
            LOGIN
          </button>
          <div style={{ color: "white" }}>
            DON'T HAVE AN ACCOUNT ? {""}
            <a className="link" href="/register">
              SIGNUP
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
