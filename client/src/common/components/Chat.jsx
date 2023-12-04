import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import { addMessage, selectMessageList } from "../../features/chatSlice";

export default function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const dispatch = useDispatch();
  const messageList = useSelector(selectMessageList);

  const sendMessage = () => {
    if (currentMessage.trim() !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      };

      dispatch(addMessage(messageData));
      socket.emit("send_message", messageData);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      dispatch(addMessage(data));
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket, dispatch]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>Room {room}</h2>
      </div>
      <ScrollToBottom className="chat-body">
        {messageList.map((messageContent, index) => (
          <div className="message" key={index}>
            <div
              className={
                username === messageContent.author
                  ? "my-message"
                  : "other-message"
              }
            >
              <div className="message-content">
                <p>{messageContent.message}</p>
              </div>
              <div className="message-meta">
                <span className="author">From: {messageContent.author}</span>
                <br />
                <span className="time">Sent at {messageContent.time}</span>
              </div>
            </div>
          </div>
        ))}
      </ScrollToBottom>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Enter message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
