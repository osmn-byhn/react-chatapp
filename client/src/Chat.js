import React, { useEffect, useState } from "react";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
    console.log(messageList);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="container">
      <div className="chat-header">
        <h5>Live Chat - {room} Room</h5>
      </div>
      <div className="chat-body">
        <div id="message">
          {messageList.map((message, index) => (
            <p key={index} id={username === message.author ? "you" : "other"}>
              {message.message}
            </p>
          ))}
        </div>
      </div>
      <div className="chat-footer row">
        <input
          type="text"
          placeholder="Heyy..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          value={currentMessage}
          className="form-control "
        />
        <button
          disabled={!currentMessage}
          onClick={sendMessage}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
          className="btn btn-dark"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
