

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Home from "./Home";

function App() {
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
        
        if (!data.status) {
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

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;