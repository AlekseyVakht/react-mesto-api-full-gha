import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Auth from "../utils/Auth.js";
import registerSuccess from '../images/register-success.svg';
import registerFailed from '../images/register-failed.svg';


function Register(props) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Auth.register(formValue.password, formValue.email)
      .then((res) => {
        props.handleInfoTooltipOpen({ text: 'Вы  успешно зарегистрированы!', img: registerSuccess });
        navigate("/sign-in", { replace: true })
        if (res.error) {
          props.handleInfoTooltipOpen({ text: 'Что-то пошло не так! Попробуйте ещё раз.', img: registerFailed });
          navigate("/sign-up", { replace: true })
          formValue.password = '';
          formValue.email = '';
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup">
      <h2 className="signup__title">Регистрация</h2>
      <form className="signup__form" onSubmit={handleSubmit}>
        <fieldset className="signup__input-container">
          <div className="signup__form-field">
            <input id="email" className="signup__form-item" name="email" type="email" onChange={handleChange} placeholder="Email" value={formValue.email || ''} required></input>
          </div>
          <div className="signup__form-field">
            <input id="password" className="signup__form-item" name="password" type="password" onChange={handleChange} placeholder="Пароль" autoComplete="current-password" value={formValue.password || ''} required></input>
          </div>
        </fieldset>
        <button type="submit" className="signup__submit-btn">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default Register;
