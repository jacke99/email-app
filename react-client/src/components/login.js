import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValues] = useState({
    username: "",
    password: "",
  });

  async function sendJson(url, method, data) {
    const fetchOptions = {
      method: method,
      body: JSON.stringify(data), // Gör om data till json
      headers: {
        "Content-Type": "application/json", // Media type json
      },
    };

    return await fetch(url, fetchOptions);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setInputValues((previnputValues) => {
      return {
        ...previnputValues,
        [name]: value,
      };
    });
  }

  async function authLogin() {
    const user = {
      username: inputValue.username,
      password: inputValue.password,
    };
    let response = await sendJson("/api/users/login", "POST", user);
    console.log(response);

    if (response.status === 200) {
      console.log("Login success");
      console.log(response);
      navigate("/Home");
    } else {
      console.log("Login failed");
      return null;
    }
  }

  function onLoginClick() {
    authLogin();
  }

  function onCreateAccountClick() {
    navigate("/CreateAccount");
  }

  return (
    <div>
      <section className="login-page">
        <h1>PRO login</h1>
        <div className="login-input-container">
          <label htmlFor="input-username">Username</label>
          <input
            name="username"
            onChange={handleChange}
            value={inputValue.username}
            className="input-username"
            type="text"
            required
          />
          <label htmlFor="input-password">Password</label>
          <input
            name="password"
            onChange={handleChange}
            value={inputValue.password}
            className="input-username"
            type="password"
            required
          />
        </div>
        <button onClick={onLoginClick} className="home-btn">
          Log in
        </button>
        <button onClick={onCreateAccountClick} className="home-btn">
          Create account
        </button>
      </section>
    </div>
  );
};

export default Login;
