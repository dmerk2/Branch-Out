import { useDispatch, useSelector } from "react-redux";
import { setUsername, setRoom, setShowChat } from "../slices/chatRoomSlice";
import io from "socket.io-client";
import Chat from "./Chat";

// Determine the socket connection URL based on the environment
const socketURL =
  process.env.NODE_ENV === "production"
    ? "https://branch-out-web-service.onrender.com"
    : "http://localhost:3001";
const socket = io.connect(socketURL);

export default function ChatRoom() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.chatRoom.username);
  const room = useSelector((state) => state.chatRoom.room);
  const showChat = useSelector((state) => state.chatRoom.showChat);

  const joinRoom = () => {
    if (username && room) {
      socket.emit("join_room", room), setShowChat(true);
    }
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        <input
          type="text"
          placeholder="Choose Your Name"
          value={username}
          onChange={(e) => dispatch(setUsername(e.target.value))}
        />
        <input
          type="text"
          placeholder="Enter Your Room"
          value={room}
          onChange={(e) => dispatch(setRoom(e.target.value))}
        />
        <button onClick={joinRoom}>Join A Room</button>
      </div>
      {showChat && <Chat socket={socket} username={username} room={room} />}
    </div>
  );
}
