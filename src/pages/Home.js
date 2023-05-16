import React from "react";
import Nav from "../components/Nav";

const Home = () => {
  //Authorization taken is added here
  const authToken = false;

  //Primaru button functionality
  const handleClick = () => {
    console.log("clicked!");
  };

  return (
    <div className="overlay">
      <Nav minimal={false} authToken={authToken} />
      <div className="home">
        <h1>Swipe Right</h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? "Signout" : "Create Account"}
        </button>
      </div>
    </div>
  );
};

export default Home;
