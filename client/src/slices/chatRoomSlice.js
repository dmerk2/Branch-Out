import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  room: '',
  showChat: false,
};

export const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setRoom: (state, action) => {
      state.room = action.payload;
    },
    setShowChat: (state, action) => {
      state.showChat = action.payload;
    },
  },
});

export const { setUsername, setRoom, setShowChat } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
