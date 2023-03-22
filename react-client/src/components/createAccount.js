import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
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
  async function createUser() {
    const user = {
      username: inputValue.username,
      password: inputValue.password,
    };
    let response = await sendJson("/api/users/", "POST", user);
    console.log(response);
  }

  function onCreateClick() {
    createUser();
    navigate("/");
  }
  function backBtn() {
    navigate("/Home");
  }
  return (
    <div>
      <section className="account-page">
        <h1>Create account</h1>
        <div className="login-input-container">
          <label htmlFor="input-username">Username</label>
          <input
            name="username"
            onChange={handleChange}
            value={inputValue.username}
            className="create-username"
            type="text"
            required
          />
          <label htmlFor="input-password">Password</label>
          <input
            name="password"
            onChange={handleChange}
            value={inputValue.password}
            className="create-password"
            type="password"
            required
          />
        </div>
        <button onClick={backBtn} className="back-btn">
          Back
        </button>
        <button onClick={onCreateClick} className="home-btn">
          Create account
        </button>
      </section>
    </div>
  );
};

export default CreateAccount;
