import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../../States/Actions/authActions";
import "./register.css";

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  console.log(registerForm);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(registerForm, navigate));
  };
  return (
    <div className="regContainer">
      <div className="regWrapper">
        <div className="regTitle">SIGN UP</div>
        <form className="regForm">
          <input
            className="regInput"
            placeholder="email"
            name="email"
            onChange={handleChange}
          />
          <input
            className="regInput"
            placeholder="firstName"
            name="firstName"
            onChange={handleChange}
          />
          <input
            className="regInput"
            placeholder="lastName"
            name="lastName"
            onChange={handleChange}
          />
          <input
            className="regInput"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <input
            className="regInput"
            placeholder="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
          />

          <span className="regAgreement">
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
            <input type="checkbox" name="checkbox" onChange={handleChange} />
          </span>
          <button className="regButton" onClick={handleSubmit}>
            SIGNUP
          </button>

          <span className="account">
            Already Have An Account ?{" "}
            <a className="regLink" href="/login">
              SIGNIN
            </a>{" "}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
