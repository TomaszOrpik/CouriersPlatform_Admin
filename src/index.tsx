import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import functionalitySlice from "./Store/Slices/functionality.slice";
import couriersSlice from "./Store/Slices/couriers.slice";
import packagesSlice from "./Store/Slices/packages.slice";
import { Couriers } from "./Store/Models/Couriers.model";
import { Functionality } from "./Store/Models/Functionality.model";
import usersSlice from "./Store/Slices/users.slice";
import { Users } from "./Store/Models/Users.model";
import { Packages } from "./Store/Models/Packages.model";
import { Registrations } from "./Store/Models/registrations.model";
import registrationsSlice from "./Store/Slices/registrations.slice";

export interface AppState {
  couriers: Couriers;
  users: Users;
  packages: Packages;
  functionality: Functionality;
  registrations: Registrations;
}

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore<AppState, any, any>({
  reducer: {
    couriers: couriersSlice,
    users: usersSlice,
    packages: packagesSlice,
    functionality: functionalitySlice,
    registrations: registrationsSlice,
  },
  devTools:
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? true
      : false,
  middleware: customizedMiddleware,
});

ReactDOM.render(
  <Provider store={store}>
    {!process.env.NODE_ENV || process.env.NODE_ENV === "development" ? (
      <App />
    ) : (
      <App />
    )}
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
