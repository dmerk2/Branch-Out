// SendMessage.jsx

import React, { useState } from 'react';
import style from "../../styles/SendMessage.module.css";

const SendMessageButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setShowModal(!showModal);
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    // Add logic to send the message (e.g., through an API call)
    console.log(`Sending message: ${message}`);

    // Close the modal after sending the message
    setShowModal(false);
  };

  return (
    <div className= {style.container}>
      <button className={style.openModalButton} onClick={handleClick}>
        Send this user a message!
      </button>

      {showModal && (
        <div className={style.modal}>
          {/* Modal content */}
          <div className={style.modalHeader}>
            <p className={style.modalText}>Send this user a message!</p>
            <button className={style.closeButton} onClick={() => setShowModal(false)}>
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
