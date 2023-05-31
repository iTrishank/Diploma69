import React from "react";

const ChatHeader = ({ user }) => {
  const logout = () => {
    document.cookie = "UserId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "AuthToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };

  return (
    <div className="chat-container-header">
      <div className="profile">
        <img
          id="chat-header-img"
          style={{
            width: "69px", // Adjust the width as need
            height: "69px", // Adjust the height as needed
            borderRadius: "50%",
            overflow: "hidden",
            objectFit: "cover",
            marginRight: "10px",
          }}
          src={user.url}
          alt={"photo of " + user.first_name}
        />
        <h3>{user.first_name}</h3>
      </div>

      <i
        className="log-out-icon"
        onClick={logout}
        style={{
          cursor: "pointer",
          fontStyle: "normal",
          fontWeight: "bold", // Set the desired font weight
          textDecoration: "none", // Add underline for classic style
        }}
      >
        Logout
      </i>
    </div>
  );
};

export default ChatHeader;
