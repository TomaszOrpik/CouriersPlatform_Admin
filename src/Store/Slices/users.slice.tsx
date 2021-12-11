import {
  createAsyncThunk,
  createSlice,
  CreateSliceOptions,
  PayloadAction,
  Slice,
} from "@reduxjs/toolkit";
import { UserService } from "../../Services/User.service";
import { User } from "../Models/User.model";
import { Users } from "../Models/Users.model";

export const addUser = createAsyncThunk(
  "users/add",
  async (user: User, thunkAPI) => {
    await UserService.addUser(user);
  }
);
export const validateUser = createAsyncThunk(
  "users/validate",
  async (user: User, thunkAPI) => {
    const response = await UserService.validateUser(user);
    return response;
  }
);
export const getUsers = createAsyncThunk("users/get", async (thunkAPI) => {
  const response = await UserService.getUsers();
  return response;
});

const initialState: Users = {
  usersList: [],
  addUserValidators: [],
  validated: false,
};

const options: CreateSliceOptions<Users> = {
  name: "users",
  initialState: initialState,
  reducers: {
    resetAddUserValidators: (state: Users, action: PayloadAction<any>) => {
      return {
        ...state,
        addUserValidators: [],
        validated: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addUser.fulfilled, (state, action) => {
      return {
        ...state,
        addUserValidators: ["Użytkownik dodany"],
        validated: false
      };
    });
    builder.addCase(addUser.rejected, (state, action) => {
      return {
        ...state,
        addUserValidators: ["Brak połaczenia z serwerem"],
        validated: false,
      };
    });
    builder.addCase(validateUser.fulfilled, (state, action) => {
      return {
        ...state,
        addUserValidators: action.payload,
        validated: action.payload.length === 0,
      };
    });
    builder.addCase(validateUser.rejected, (state, action) => {
      return {
        ...state,
        addCourierValidators: ["Brak połączenia z serwerem"],
        validated: false,
      };
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      return {
        ...state,
        usersList: action.payload,
      };
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      console.log("%ccannot get data", "color: red");
      console.log(action.payload);
      return {
        ...state,
      };
    });
  },
};

const usersSlice: Slice = createSlice(options);

export const { resetAddUserValidators } = usersSlice.actions;

export default usersSlice.reducer;
