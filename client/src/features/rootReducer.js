import { combineReducers } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';

const rootReducer = combineReducers({
  chat: chatReducer,
});

export default rootReducer;