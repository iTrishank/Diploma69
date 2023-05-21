import React, { useState } from "react";

const ChatInput = () => {
  const [testArea, setTextArea] = useState(null);
  return (
    <div className="chat-input">
      <textarea
        value={testArea}
        onChange={(e) => setTextArea(e.target.value)}
      />
      <button className="secondary-button">Submit</button>
    </div>
  );
};

export default ChatInput;
