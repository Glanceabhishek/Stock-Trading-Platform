import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import axios from "axios";
import "./index.css";
import Home from "./components/Home";

function AppWrapper() {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const urlToken = urlParams.get('token');

      if (urlToken) {
        localStorage.setItem('dashToken', urlToken);
        window.history.replaceState({}, document.title, '/');
      }

      const token = localStorage.getItem('dashToken');

      if (!token) {
        window.location.href = "https://stock-trading-platform-eta.vercel.app";
        return;
      }

      try {
        const { data } = await axios.post(
          "https://stock-trading-platform-backend-3svr.onrender.com/",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("VERIFY RESPONSE:", data);

        if (data.status) {
          setVerified(true);
        } else {
          localStorage.removeItem('dashToken');
          window.location.href = "https://stock-trading-platform-eta.vercel.app";
        }
      } catch (error) {
        console.error("Auth verify failed:", error.message);
        window.location.href = "https://stock-trading-platform-eta.vercel.app";
      }
    };
    verifyUser();
  }, []);

  if (!verified) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <AppWrapper />
    </CookiesProvider>
  </React.StrictMode>
);
