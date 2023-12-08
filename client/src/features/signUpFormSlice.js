import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import { client } from "../App";
import { ADD_USER } from "../common/utils/mutations";
import { CHECK_USERNAME_EMAIL_EXISTS } from "../common/utils/queries";
import AuthService from "../common/utils/auth";

// Async thunk for checking username/email existence
export const checkUsernameEmailExists = createAsyncThunk(
  'signUpForm/checkUsernameEmailExists',
  async ({ username, email }, { rejectWithValue }) => {
    try {
      const response = await client.query({
        query: gql`${CHECK_USERNAME_EMAIL_EXISTS}`,
        variables: { username, email },
      });
      return response.data.users;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for file upload and user registration
export const uploadFileAndRegisterUser = createAsyncThunk(
  'signUpForm/uploadFileAndRegisterUser',
  async ({ userFormData, imageUrl }, { rejectWithValue }) => {
    try {
      // Register the user with the uploaded image URL
      const registrationResponse = await client.mutate({
        mutation: gql`${ADD_USER}`,
        variables: { ...userFormData, profileImage: imageUrl },
      });

      AuthService.login(registrationResponse.data.addUser.token);
      return registrationResponse.data.addUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userFormData: {
    email: "",
    password: "",
    username: "",
    bio: "",
    profileImage: null,
  },
  isUploading: false,
  showAlert: false,
  uploadProgress: 0,
  checkUsernameEmailLoading: false,
  checkUsernameEmailError: null,
  userRegistrationError: null,
};

export const signUpFormSlice = createSlice({
  name: 'signUpForm',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { field, value } = action.payload;
      if (field === 'profileImage') {
        // Store only file metadata
        state.userFormData[field] = {
          name: value.name,
          size: value.size,
          type: value.type
        };
      } else {
        state.userFormData[field] = value;
      }
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    resetRegistrationError: (state) => {
      state.userRegistrationError = null;
    },
    resetForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUsernameEmailExists.pending, (state) => {
        state.checkUsernameEmailLoading = true;
        state.checkUsernameEmailError = null;
      })
      .addCase(checkUsernameEmailExists.fulfilled, (state, action) => {
        state.checkUsernameEmailLoading = false;
        state.checkUsernameEmailError = null;
      })
      .addCase(checkUsernameEmailExists.rejected, (state, action) => {
        state.checkUsernameEmailLoading = false;
        state.checkUsernameEmailError = action.error.message;
      })
      .addCase(uploadFileAndRegisterUser.pending, (state) => {
        state.isUploading = true;
        state.userRegistrationError = null;
      })
      .addCase(uploadFileAndRegisterUser.fulfilled, (state, action) => {
        state.isUploading = false;
        state.userRegistrationError = null;
      })
      .addCase(uploadFileAndRegisterUser.rejected, (state, action) => {
        state.isUploading = false;
        state.userRegistrationError = action.error.message;
      });
  }
});

export const { updateFormData, setUploadProgress, resetForm } = signUpFormSlice.actions;
export default signUpFormSlice.reducer;