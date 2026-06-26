import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const [username, setUsername] = useState("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyCookie = async () => {
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
        
        if (data.status) {
          setUsername(data.user);
          setVerified(true);
          toast(`Hello ${data.user}`, { position: "top-right" });
        } else {
          localStorage.removeItem('dashToken');
          window.location.href = "https://stock-trading-platform-eta.vercel.app";
        }
      } catch (error) {
        console.error("Verification failed", error);
        localStorage.removeItem('dashToken');
        window.location.href = "https://stock-trading-platform-eta.vercel.app";
      }
    };
    verifyCookie();
  }, []);

  const Logout = () => {
    localStorage.removeItem('dashToken');
    window.location.href = "https://stock-trading-platform-eta.vercel.app";
  };

  if (!verified) return <div>Loading...</div>;

  return (
    <>
      <TopBar />
      <Dashboard />
      <ToastContainer />
    </>
  );
};

export default Home;
