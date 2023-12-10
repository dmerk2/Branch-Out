import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import { addMessage, selectMessageList } from "../../features/chatSlice";
import styles from "../../styles/Chat.module.css";

export default function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const dispatch = useDispatch();
  const messagesByRoom = useSelector((state) => state.chat.messagesByRoom);
  const messageList = messagesByRoom[room] || [];

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
        <h2 className={styles.roomName}>Room {room}</h2>
      </div>
      <ScrollToBottom className={styles.chatBody}>
        {messageList.map((messageContent, index) => (
          <div className="message" key={index}>
            <div
              className={
                username === messageContent.author
                  ? "my-message"
                  : "other-message"
              }
            >
              <div className={styles.messageMeta}>
                <span className={styles.author}>{messageContent.author}</span>
                <div className={styles.messageContent}>
                  <p>{messageContent.message}</p>
                </div>
                <span className={styles.time}>
                  Sent at {messageContent.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </ScrollToBottom>
      <div className={styles.chatFooter}>
        <input
          className={styles.chatInput}
          type="text"
          placeholder="Enter message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className={styles.sendButton} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
