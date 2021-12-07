import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Chat({ socket, username, room }) {
  const [currentmsg, setCurrentmsg] = useState("");
  const [msglist, setMsglist] = useState([]);

  const sendMsg = async () => {
    if (currentmsg !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentmsg,
        time: formatAMPM(new Date()),
      };

      await socket.emit("send_message", messageData);
      setMsglist((list) => [...list, messageData]);
      setCurrentmsg("");
    }
  };

  useEffect(() => {
    socket.on("receive_msg", (data) => {
      setMsglist((list) => [...list, data]);
      console.log(data);
    });
  }, [socket]);

  useEffect(() => {
    toast(`welcome ${username}, You are in  Room: ${room}`);
  }, [room, username]);

  return (
    <div className="chat-window">
      <ToastContainer />
      <div className="users">{username}</div>
      <div className="chat-header">
        <p>Room : {room}</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {msglist.map((e) => {
            return (
              <div
                className="message"
                id={username === e.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{e.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{e.time}</p>
                    <p id="author">{e.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Hey!..."
          value={currentmsg}
          onChange={(event) => {
            setCurrentmsg(event.target.value);
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMsg();
          }}
        />
        <button onClick={sendMsg}>
          <i className="material-icons" style={{ color: "yellow" }}>
            send
          </i>
        </button>
      </div>
    </div>
  );
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

console.log(formatAMPM(new Date()));
