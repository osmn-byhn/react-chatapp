import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";


const socket = io.connect("https://backend-chatapp-d0gj.onrender.com");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App container">
      {!showChat ? (
        <div className="joinChatContainer row">
          <h3 className="mb-5 mt-5">Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            className="col-12 form-control mb-4"
          />
          <br></br><br></br>
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
            className="col-12 form-control mb-4"
          />

          <button onClick={joinRoom} className="btn btn-dark">Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;