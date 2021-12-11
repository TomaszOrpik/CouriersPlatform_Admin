import {
  createAsyncThunk,
  createSlice,
  CreateSliceOptions,
  PayloadAction,
  Slice,
} from "@reduxjs/toolkit";
import { Functionality } from "../Models/Functionality.model";
import { AuthService } from "../../Services/Auth.service";

export const authenticateUser = createAsyncThunk(
  "functionality/authenticate",
  async (user: { login: string; password: string }, thunkAPI) => {
    const respone = await AuthService.validate(user.login, user.password);
    return respone;
  }
);

const options: CreateSliceOptions = {
  name: "functionality",
  initialState: {
    activeNotificationId: "",
    canWrite: false,
    canRead: false,
    incorrectLoginInputMessage: "",
    sideBarVisible: false,
    confirmationModalVisible: false,
    mapPopupVisible: false,
  },
  reducers: {
    logoutUser: (state: Functionality, action: PayloadAction<any>) => {
      return {
        ...state,
        canRead: false,
        canWrite: false,
        incorrectLoginInputMessage: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      if (!action.payload) {
        return {
          ...state,
          canRead: false,
          canWrite: false,
          incorrectLoginInputMessage: "Nieprawidłowy login lub hasło",
        };
      } else {
        return {
          ...state,
          canRead: true,
          canWrite: action.payload,
          incorrectLoginInputMessage: "",
        };
      }
    });
    builder.addCase(authenticateUser.rejected, (state, action) => {
      return {
        ...state,
        canRead: false,
        canWrite: false,
        incorrectLoginInputMessage: "Brak połączenia z serwerem",
      };
    });
  },
};
const functionalitySlice: Slice = createSlice(options);

export const {
  loginUser,
  logoutUser,
} = functionalitySlice.actions;

export default functionalitySlice.reducer;
