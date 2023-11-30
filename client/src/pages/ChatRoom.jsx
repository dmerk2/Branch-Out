import { useState } from "react";
import io from "socket.io-client";
import Chat from "../components/Chat";

const socket = io.connect("http://localhost:3001");

export default function ChatRoom() {
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
    <div>
      <h1>Chat Room</h1>
      <div>
        <input
          type="text"
          placeholder="Choose Your Name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Your Room"
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom}>Join A Room</button>
      </div>
      <Chat socket={socket} username={username} room={room} />
    </div>
  );
}