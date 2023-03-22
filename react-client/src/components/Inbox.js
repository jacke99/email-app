import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Inbox = () => {
  useEffect(() => {
    fetchInbox();
  }, []);
  let [inbox, setInbox] = useState(null);
  const navigate = useNavigate();
  function backBtn() {
    navigate("/Home");
  }

  async function fetchInbox() {
    let response = await fetch("/api/inbox");
    let result = await response.json();
    if (response.status === 200) {
      setInbox(result);
    } else {
      console.log("fetch failed");
    }
  }

  return (
    <div className="inbox-wrapper">
      <h2>Inbox</h2>
      <div className="inbox-btn-container">
        <button onClick={backBtn} className="back-btn">
          Back
        </button>
        <button onClick={fetchInbox} className="home-btn">
          Refresh
        </button>
      </div>

      {inbox &&
        inbox.map((mail, index) => {
          return (
            <div key={index} className="email-item">
              <h2 className="email-title"> {mail.from}</h2>
              <p className="email-content">{mail.message}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Inbox;
