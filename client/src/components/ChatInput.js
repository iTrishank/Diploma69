import React, { useState } from "react";
import axios from "axios";

const ChatInput = ({
  user,
  clickedUser,
  getUsersMessages,
  getClickedUsersMessages,
}) => {
  const [testArea, setTextArea] = useState("");
  const userId = user?.user_id;
  const clickUserId = clickedUser?.user_id;

  const addMessage = async () => {
    const message = {
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: clickUserId,
      message: testArea,
    };
    try {
      await axios.post("http://localhost:8000/message", { message });
      getUsersMessages();
      getClickedUsersMessages();
      setTextArea("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat-input">
      <textarea
        value={testArea}
        onChange={(e) => setTextArea(e.target.value)}
      />
      <button className="secondary-button" onClick={addMessage}>
        Submit
      </button>
    </div>
  );
};

export default ChatInput;
