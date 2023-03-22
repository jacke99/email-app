import CreateAccount from "./components/createAccount";
import Login from "./components/login";
import SendEmail from "./components/SendEmail";
import Home from "./components/Home";
import Inbox from "./components/Inbox";
import SentEmailInbox from "./components/SentEmailInbox";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./style.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/SendEmail" element={<SendEmail />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Inbox" element={<Inbox />} />
          <Route path="/Sent" element={<SentEmailInbox />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
