import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    username: '',
    room: '',
    messageList: [],
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setRoom: (state, action) => {
      state.room = action.payload;
    },
    addMessage: (state, action) => {
      state.messageList.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messageList = action.payload;
    },
  }
});

export const { setUsername, setRoom, addMessage, setMessages } = chatSlice.actions;

export const selectUsername = state => state.chat.username;
export const selectRoom = state => state.chat.room;
export const selectMessageList = state => state.chat.messageList;

export default chatSlice.reducer;