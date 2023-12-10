import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    username: '',
    room: '',
    messagesByRoom: {},
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setRoom: (state, action) => {
      state.room = action.payload;
    },
    addMessage: (state, action) => {
      const { room, ...message } = action.payload;
      if (!state.messagesByRoom[room]) {
        state.messagesByRoom[room] = [];
      }
      state.messagesByRoom[room].push(message);
    },
    setMessages: (state, action) => {
      const { room, messages } = action.payload;
      state.messagesByRoom[room] = messages;
    },
  }
});

export const { setUsername, setRoom, addMessage, setMessages } = chatSlice.actions;

export const selectUsername = state => state.chat.username;
export const selectRoom = state => state.chat.room;
export const selectMessageList = state => state.chat.messageList;

export default chatSlice.reducer;