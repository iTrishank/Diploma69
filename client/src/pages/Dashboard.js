import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";

const Dashboard = () => {
  const getCookie = (name) => {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [cookieName, cookieValue] = cookie.split("=");
      acc[cookieName] = cookieValue;
      return acc;
    }, {});

    return cookies[name] || "";
  };

  const userId = getCookie("UserId");

  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log("user", user);

  const characters = [
    {
      name: "Ricchi Hendricks",
      url: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
    {
      name: "Erlich Bachman",
      url: "https://images.unsplash.com/photo-1602241628512-459cdd3234fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
    {
      name: "Monica Hall",
      url: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
    {
      name: "Jared Dunn",
      url: "https://images.unsplash.com/photo-1602241628512-459cdd3234fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
    {
      name: "Dinesh Chugtai",
      url: "https://images.unsplash.com/photo-1602241628512-459cdd3234fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
  ];
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };
  return (
    <>
      {user && (
        <div className="dashboard">
          <ChatContainer user={user} />
          <div className="swipe-container">
            <div className="card-container">
              {characters.map((character) => (
                <TinderCard
                  className="swipe"
                  key={character.name}
                  onSwipe={(dir) => swiped(dir, character.name)}
                  onCardLeftScreen={() => outOfFrame(character.name)}
                >
                  <div
                    style={{ backgroundImage: "url(" + character.url + ")" }}
                    className="card"
                  >
                    <h3>{character.name}</h3>
                  </div>
                </TinderCard>
              ))}
              <div className="swipe-info">
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
