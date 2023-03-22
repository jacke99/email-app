import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

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

  function SendEmail() {
    navigate("/SendEmail");
  }

  function inbox() {
    navigate("/Inbox");
  }
  function sentInbox() {
    navigate("/Sent");
  }

  async function LogOut() {
    let response = await sendJson("/api/logout", "POST");
    console.log(response);

    if (response.status === 200) {
      navigate("/");
    } else {
      //   return null;
      navigate("/");
    }
  }

  return (
    <div className="home-container">
      <h2 className="home-title">PRO-Mail</h2>
      <button onClick={inbox} className="home-btn">
        Inbox
      </button>
      <button onClick={SendEmail} className="home-btn">
        Send email
      </button>
      <button onClick={sentInbox} className="home-btn">
        Sent
      </button>
      <button onClick={LogOut} className="home-btn">
        Log out
      </button>
    </div>
  );
};

export default Home;
