import React from "react";
import whiteLogo from "../images/tinder_logo_white.png";
import colorLogo from "../images/color-logo-tinder.png";

const Nav = ({ minimal, authToken, setShowModal, showModal, setIsSignUp }) => {
  //* To show the modal from "Login button"
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };
  return (
    <nav>
      <div className="logo-container">
        <img
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
