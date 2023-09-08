import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Auth from "../utils/Auth.js";

function Login(props) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    Auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          setFormValue({ email: "", password: "" });
          props.handleLogin();
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup">
    <h2 className="signup__title">Вход</h2>
    <form className="signup__form" onSubmit={handleSubmit}>
      <fieldset className="signup__input-container">
      <div className="signup__form-field">
            <input id="email" className="signup__form-item" name="email" type="email" onChange={handleChange} placeholder="Email" value={formValue.email || ''} required></input>
          </div>
          <div className="signup__form-field">
            <input id="password" className="signup__form-item" name="password" type="password" onChange={handleChange} placeholder="Пароль" value={formValue.password || ''} autoComplete="current-password" required></input>
          </div>
      </fieldset>
      <button type="submit" className="signup__submit-btn">
        Войти
      </button>
    </form>
  </div>
  );
}

export default Login;
