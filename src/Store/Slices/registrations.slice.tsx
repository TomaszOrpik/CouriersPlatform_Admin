import {
  createAsyncThunk,
  createSlice,
  CreateSliceOptions,
  PayloadAction,
  Slice,
} from "@reduxjs/toolkit";
import { RegistrationRequest } from "../Models/RegistrationRequest.model";
import { RegistrationService } from "../../Services/Registration.service";
import { Registrations } from "../Models/registrations.model";

export const addRegistration = createAsyncThunk(
  "registrations/add",
  async (registrationRequest: RegistrationRequest, thunkAPI) => {
    await RegistrationService.addRegistration(
      registrationRequest
    );
  }
);

export const validateRegistration = createAsyncThunk(
  "registrations/validate",
  async (registrationRequest: RegistrationRequest, thunkAPI) => {
    const response = await RegistrationService.validateRegistration(
      registrationRequest
    );
    return response;
  }
);

export const getRegistrations = createAsyncThunk(
  "registrations/get",
  async (thunkAPI) => {
    const response = await RegistrationService.getRegistrations();
    return response;
  }
);

const initialState: Registrations = {
  registrationsList: [],
  addRegistrationValidators: [],
  validated: false,
  activeRegistrationId: '',
};

const options: CreateSliceOptions<Registrations> = {
  name: "registrations",
  initialState: initialState,
  reducers: {
    resetAddRegistrationValidators: (
      state: Registrations,
      action: PayloadAction<any>
    ) => {
      return {
        ...state,
        addRegistrationValidators: [],
        validated: false,
      };
    },
    setActiveRegistrationId: (state: Registrations, action: PayloadAction<string>) => {
      return { ...state, activeRegistrationId: action.payload }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addRegistration.fulfilled, (state, action) => {
      return {
        ...state,
        addRegistrationValidators: ['Zgłoszenie dodane'],
        validated: false
      };
    });
    builder.addCase(addRegistration.rejected, (state, action) => {
      return {
        ...state,
        addRegistrationValidators: ["Brak połączenia z serwerem"],
        validated: false,
      };
    });
    builder.addCase(validateRegistration.fulfilled, (state, action) => {
      return {
        ...state,
        addRegistrationValidators: action.payload,
        validated: action.payload.length === 0,
      };
    });
    builder.addCase(validateRegistration.rejected, (state, action) => {
      return {
        ...state,
        addRegistrationValidators: ["Brak połączenia z serwerem"],
        validated: false,
      };
    });
    builder.addCase(getRegistrations.fulfilled, (state, action) => {
      return {
        ...state,
        registrationsList: action.payload,
        activeRegistrationId: action.payload[0]?.id
      };
    });
    builder.addCase(getRegistrations.rejected, (state, action) => {
      console.log("%ccannot get data", "color: red");
      console.log(action.payload);
      return {
        ...state,
      };
    });
  },
};

const registrationsSlice: Slice = createSlice(options);

export const { resetAddRegistrationValidators, setActiveRegistrationId } = registrationsSlice.actions;

export default registrationsSlice.reducer;
