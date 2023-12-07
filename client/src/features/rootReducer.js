import { combineReducers } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import signUpFormReducer from './signUpFormSlice';

const rootReducer = combineReducers({
  chat: chatReducer,
  signUpForm: signUpFormReducer,
});

export default rootReducer;