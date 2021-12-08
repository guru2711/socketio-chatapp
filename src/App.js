import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./chat";

var socket = io.connect("https://socketio-chata.herokuapp.com", {
  transports: ["websocket", "polling", "flashsocket"],
});

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [chat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);

      // console.log(username + " " + room);
    } else {
      alert("please... fill all the fields 👈🏻");
    }
  };

  return (
    <div className="img">
      <div className="App">
        {!chat ? (
          <div className="joinChatContainer">
            <h3>
              <i style={{ fontFamily: "cursive", color: "whitesmoke" }}>
                Join a chat
              </i>
            </h3>
            <input
              type="text"
              placeholder="Name U Like..."
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room ID..."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button onClick={joinRoom}>Join A Room</button>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>
    </div>
  );
}

export default App;
