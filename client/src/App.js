import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/OnBoarding";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  //* Get cookie value by name
  const getCookie = (name) => {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [cookieName, cookieValue] = cookie.split("=");
      acc[cookieName] = cookieValue;
      return acc;
    }, {});

    return cookies[name] || "";
  };
  const authToken = getCookie("AuthToken");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {authToken && <Route path="/Dashboard" element={<Dashboard />} />}
        {authToken && <Route path="/OnBoarding" element={<OnBoarding />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
