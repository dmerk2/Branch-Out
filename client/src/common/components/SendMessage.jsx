import { useState } from "react";
import { Link } from "react-router-dom";
import style from "../../styles/SendMessage.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faRightToBracket} from '@fortawesome/free-solid-svg-icons';
import auth from "../utils/auth";

const SendMessageButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = () => {
    setShowModal(!showModal);
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    console.log(`Sending message: ${message}`);

    // Close the modal after sending the message
    setShowModal(false);
  };

  const isLoggedIn = auth.loggedIn();

  return (
    <div className={style.container}>
      {isLoggedIn ? (
        <>
          <h2 className={style.messageHeader}>Send this user a message!</h2>
          <button className={style.smallDiamondShape} onClick={handleClick}>
            <FontAwesomeIcon icon={faEnvelope} className={style.messageIcon}/>
          </button>
        </>
      ) : (
        <>
        <h2 className={style.logoutMessageHeader}>Login to send this user a message!</h2>
        <Link to="/login" className={style.smallDiamondShape} >
          <FontAwesomeIcon icon={faRightToBracket} className={style.logoutMessageIcon}/>
          </Link>
        </>
      )}

      {showModal && (
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <p className={style.modalText}>What do you want to send?</p>
            <button
              className={style.closeButton}
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
          </div>
          <textarea
            className={style.modalTextArea}
            rows="4"
            cols="50"
            value={message}
            onChange={handleInputChange}
          />
          <br />
          <div className={style.modalButtons}>
            <button className={style.sendButton} onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendMessageButton;
