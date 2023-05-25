import React from "react";
import whiteLogo from "../images/logoWhite.png";
import colorLogo from "../images/logoBlack.png";

const Nav = ({ minimal, setShowModal, showModal, setIsSignUp }) => {
  //* To show the modal from "Login button"
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };

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
    <nav>
      <div className="logo-container">
        <img
          style={{}}
          className="logo"
          src={minimal ? colorLogo : whiteLogo}
          alt="noImg"
        />
      </div>
      {!authToken && (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
        >
          Log In
        </button>
      )}
    </nav>
  );
};

export default Nav;
