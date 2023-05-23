import React from "react";
import Nav from "../components/Nav";
import { useState } from "react";
import AuthModal from "../components/AuthModal";

const Home = () => {
  //* Authorization taken is added here
  const getCookie = (name) => {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [cookieName, cookieValue] = cookie.split("=");
      acc[cookieName] = cookieValue;
      return acc;
    }, {});

    return cookies[name] || "";
  };
  const authToken = getCookie("AuthToken");

  const [showModal, setShowModal] = useState(false);

  //* Where the state of signup is stored
  const [isSignUp, setIsSignUp] = useState(true);

  //* Primary button functionality
  const handleClick = () => {
    if (authToken) {
      document.cookie =
        "UserId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "AuthToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload();
    }
    setShowModal(true);
    setIsSignUp(true);
  };

  return (
    <div className="overlay">
      <Nav
        authToken={authToken}
        minimal={false}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className="home">
        <h1 className="primary-title">Swipe Right</h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? "Signout" : "Create Account"}
        </button>

        {showModal && (
          <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
        )}
      </div>
    </div>
  );
};

export default Home;
