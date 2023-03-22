import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SendEmail = () => {
  const navigate = useNavigate();

  const [emailValues, setEmailValues] = useState({
    to: "",
    message: "",
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
    setEmailValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function sendEmail() {
    const email = {
      to: emailValues.to,
      message: emailValues.message,
    };
    let response = await sendJson("/api/users/send", "POST", email);
    if (response.status === 200) {
      setEmailValues({
        to: "",
        message: "",
      });
      alert("Email was sent");
    } else if (response.status === 400) {
      alert("User was not found");
    } else {
      navigate("/");
    }

    console.log(response);
  }

  function backBtn() {
    navigate("/Home");
  }

  return (
    <div className="send-page">
      <h1>Inbox</h1>

      <section className="field-container">
        <label htmlFor="to-field">To</label>
        <input
          value={emailValues.to}
          onChange={handleChange}
          name="to"
          className="to-field"
          type="text"
        />

        <label htmlFor="message-field">Message</label>
        <textarea
          className="message-field"
          name="message"
          value={emailValues.message}
          onChange={handleChange}
          cols="30"
          rows="10"></textarea>
        <div className="btn-container">
          <button onClick={backBtn} className="back-btn">
            Back
          </button>
          <button onClick={sendEmail} className="home-btn">
            Send
          </button>
        </div>
      </section>
    </div>
  );
};

export default SendEmail;
