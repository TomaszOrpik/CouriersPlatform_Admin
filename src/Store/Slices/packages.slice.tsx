import {
  createAsyncThunk,
  createSlice,
  CreateSliceOptions,
  PayloadAction,
  Slice,
} from "@reduxjs/toolkit";
import { PackageService } from "../../Services/Package.service";
import { PackageRequest } from "../Models/PackageRequest.model";
import { Packages } from "../Models/Packages.model";

export const addPackage = createAsyncThunk(
  "packages/add",
  async (packageRequest: PackageRequest, thunkAPI) => {
    await PackageService.addPackage(packageRequest);
  }
);

export const validatePackage = createAsyncThunk(
  "packages/validate",
  async (packageRequest: PackageRequest) => {
    const response = await PackageService.validatePackage(packageRequest);
    return response;
  }
);

export const getPackages = createAsyncThunk(
  "packages/get",
  async (thunkAPI) => {
    const response = await PackageService.getPackages();
    return response;
  }
);

const initialState: Packages = {
  packagesList: [],
  addPackageValidators: [],
  validated: false,
  activePackageId: '',
};

const options: CreateSliceOptions<Packages> = {
  name: "packages",
  initialState: initialState,
  reducers: {
    resetAddPackageValidators: (
      state: Packages,
      action: PayloadAction<any>
    ) => {
      return {
        ...state,
        addPackageValidators: [],
        validated: false,
      };
    },
    setActivePackageId: (
      state: Packages,
      action: PayloadAction<string>
    ) => {
      return { ...state, activePackageId: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPackage.fulfilled, (state, action) => {
      return {
        ...state,
        addPackageValidators: ['Przesyłka dodana'],
        validated: false
      };
    });
    builder.addCase(addPackage.rejected, (state, action) => {
      return {
        ...state,
        addPackageValidators: ["Brak połączenia z serwerem"],
        validated: false,
      };
    });
    builder.addCase(validatePackage.fulfilled, (state, action) => {
      return {
        ...state,
        addPackageValidators: action.payload,
        validated: action.payload.length === 0,
      };
    });
    builder.addCase(validatePackage.rejected, (state, action) => {
      return {
        ...state,
        addPackageValidators: ["Brak połączenia z serwerem"],
        validated: false,
      };
    });
    builder.addCase(getPackages.fulfilled, (state, action) => {
      return {
        ...state,
        packagesList: action.payload,
        activePackageId: action.payload[0]?.id
      };
    });
    builder.addCase(getPackages.rejected, (state, action) => {
      console.log("%ccannot get data", "color: red");
      console.log(action.payload);
      return {
        ...state,
      };
    });
  },
};

const packagesSlice: Slice = createSlice(options);

export const { resetAddPackageValidators, setActivePackageId } = packagesSlice.actions;

export default packagesSlice.reducer;
