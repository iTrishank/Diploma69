import React from "react";

const Chat = ({ descendingOrderMessages }) => {
  return (
    <>
      <div className="chat-display">
        {descendingOrderMessages.map((message, _index) => (
          <div key={_index}>
            <div
              className="chat-message-header"
              style={{ borderTop: "1px solid grey" }}
            >
              <div className="img-container">
                <img src={message.img} alt={message.first_name + " profile"} />
              </div>
              <p style={{ fontSize: "25px" }}>{message.name}</p>
            </div>
            <p
              className="mess"
              style={{ marginLeft: "15px", color: "rgb(36, 36, 36)" }}
            >
              {message.message}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Chat;
