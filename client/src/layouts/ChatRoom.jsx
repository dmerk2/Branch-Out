import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import Chat from "../common/components/Chat";
import {
  setUsername,
  setRoom,
  selectUsername,
  selectRoom,
} from "../features/chatSlice"; // Import Redux actions and selectors

// Determine the socket connection URL based on the environment
const socketURL =
  process.env.NODE_ENV === "production"
    ? "https://branch-out-web-service.onrender.com"
    : "http://localhost:3001";

const socket = io.connect(socketURL);

export default function ChatRoom() {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);
  const room = useSelector(selectRoom);
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const handleUsernameChange = (e) => {
    dispatch(setUsername(e.target.value));
  };

  const handleRoomChange = (e) => {
    dispatch(setRoom(e.target.value));
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        <input
          type="text"
          placeholder="Choose Your Name"
          onChange={handleUsernameChange}
        />
        <input
          type="text"
          placeholder="Enter Your Room"
          onChange={handleRoomChange}
        />
        <button onClick={joinRoom}>Join A Room</button>
      </div>
      <Chat socket={socket} username={username} room={room} />
    </div>
  );
}
