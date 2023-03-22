import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SentEmailInbox = () => {
  useEffect(() => {
    fetchSentInbox();
  }, []);
  let [inbox, setInbox] = useState(null);
  console.log(inbox);
  const navigate = useNavigate();
  function backBtn() {
    navigate("/Home");
  }

  async function fetchSentInbox() {
    let response = await fetch("/api/sent");
    let result = await response.json();
    console.log(result);
    if (response.status === 200) {
      console.log(result);
      setInbox(result);
    } else {
      console.log("fetch failed");
    }
  }

  return (
    <div className="inbox-wrapper">
      <h2>Sent emails</h2>
      <div className="inbox-btn-container">
        <button onClick={backBtn} className="back-btn">
          Back
        </button>
        <button onClick={fetchSentInbox} className="home-btn">
          Refresh
        </button>
      </div>

      {inbox &&
        inbox.map((mail, index) => {
          return (
            <div key={index} className="email-item">
              <h2 className="email-title"> {mail.to}</h2>
              <p className="email-content">{mail.message}</p>
            </div>
          );
        })}
    </div>
  );
};

export default SentEmailInbox;
