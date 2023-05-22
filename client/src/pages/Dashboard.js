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
  const [lastDirection, setLastDirection] = useState();
  const [user, setUser] = useState(null);
  const [genderedUsers, setGenderedUsers] = useState(null);

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

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/gendered-users", {
        params: { gender: user?.gender_interest },
      });
      setGenderedUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getGenderedUsers();
  }, [user, genderedUsers]);

  const updatedMatches = async (matchedUserId) => {
    try {
      await axios.put("http://localhost:8000/addmatch", {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user);

  const swiped = (direction, swipedUserId) => {
    //! Swiping algorithms
    if (direction === "right") {
      updatedMatches(swipedUserId);
    }
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
              {genderedUsers?.map((genderedUsers) => (
                <TinderCard
                  className="swipe"
                  key={genderedUsers.first_name}
                  onSwipe={(dir) => swiped(dir, genderedUsers.user_id)}
                  onCardLeftScreen={() => outOfFrame(genderedUsers.first_name)}
                >
                  <div
                    style={{
                      backgroundImage: "url(" + genderedUsers.url + ")",
                    }}
                    className="card"
                  >
                    <h3>{genderedUsers.first_name}</h3>
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
