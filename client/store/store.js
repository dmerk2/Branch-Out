import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../src/slices/chatSlice';
import chatRoomReducer from '../src/slices/chatRoomSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    chatRoom: chatRoomReducer,
  }
});