import {
  createAsyncThunk,
  createSlice,
  CreateSliceOptions,
  PayloadAction,
  Slice,
} from "@reduxjs/toolkit";
import { CourierService } from "../../Services/Courier.service";
import { CourierRequest } from "../Models/CourierRequest.model";
import { Couriers } from "../Models/Couriers.model";

export const addCourier = createAsyncThunk(
  "couriers/add",
  async (courier: CourierRequest, thunkAPI) => {
    await CourierService.addCourier(courier);
  }
);
export const validateCourier = createAsyncThunk(
  "couriers/validate",
  async (courier: CourierRequest, thunkAPI) => {
    const response = await CourierService.validateCourier(courier);
    return response;
  }
);
export const getCouriers = createAsyncThunk(
  "couriers/get",
  async (thunkAPI) => {
    const response = await CourierService.getCouriers();
    return response;
  }
);

const intialState: Couriers = {
  couriersList: [],
  addCourierValidators: [],
  validated: false,
  activeCourierId: '',
};

const options: CreateSliceOptions<Couriers> = {
  name: "couriers",
  initialState: intialState,
  reducers: {
    resetAddCourierValidators: (
      state: Couriers,
      action: PayloadAction<any>
    ) => {
      return {
        ...state,
        addCourierValidators: [],
        validated: false,
      };
    },
    setActiveCourierId: (
      state: Couriers,
      action: PayloadAction<string>
    ) => {
      return { ...state, activeCourierId: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCourier.fulfilled, (state, action) => {
      return {
        ...state,
        addCourierValidators: ['Kurier dodany'],
        validated: false
      };
    });
    builder.addCase(addCourier.rejected, (state, action) => {
      return {
        ...state,
        addCourierValidators: ["Brak połączenia z serwerem"],
        validated: false,
      };
    });
    builder.addCase(validateCourier.fulfilled, (state, action) => {
      return {
        ...state,
        addCourierValidators: action.payload,
        validated: action.payload.length === 0,
      };
    });
    builder.addCase(validateCourier.rejected, (state, action) => {
      return {
        ...state,
        addCourierValidators: ["Brak połączenia z serwerem"],
        validated: false,
      };
    });
    builder.addCase(getCouriers.fulfilled, (state, action) => {
      return {
        ...state,
        couriersList: action.payload,
        activeCourierId: action.payload[0]?.employeeNumber
      };
    });
    builder.addCase(getCouriers.rejected, (state, action) => {
      console.log("%ccannot get data", "color: red");
      console.log(action.payload);
      return {
        ...state,
      };
    });
  },
};

const curiersSlice: Slice = createSlice(options);

export const { resetAddCourierValidators, setActiveCourierId } = curiersSlice.actions;

export default curiersSlice.reducer;
