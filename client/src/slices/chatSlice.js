import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messageList: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messageList.push(action.payload);
    },
  },
})

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;