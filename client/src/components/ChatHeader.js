import React from "react";

const ChatHeader = (user) => {
  const logout = () => {
    document.cookie = "UserId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "AuthToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };

  return (
    <div className="chat-container-header">
      <div className="profile">
        <img src={user.url} alt={"photo of " + user.first_name} />
        <h3>{user.first_name}</h3>
      </div>

      <i className="log-out-icon" onClick={logout}>
        «
      </i>
    </div>
  );
};

export default ChatHeader;
