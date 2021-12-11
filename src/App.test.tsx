import { act } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from 'enzyme';
import thunk from 'redux-thunk';

import App from "./App";
import { createMockCourier } from "./Store/Models/Courier.model.mock";
import { createMockString } from "./Utilities/test.utilities";
import { createMockUser } from "./Store/Models/User.model.mock";
import { createMockPackage } from "./Store/Models/Package.model.mock";
import { AuthService } from "./Services/Auth.service";
import { CourierService } from "./Services/Courier.service";
import { InstructionsService } from "./Services/Instructions.service";
import { LocalStorageService } from "./Services/LocalStorage.service";
import { PackageService } from "./Services/Package.service";
import { RegistrationService } from "./Services/Registration.service";
import { UserService } from "./Services/User.service";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('App', () => {
    let wrapper: ReactWrapper;
    let store: any;

    test('create App', () => {
        store = mockStore({
            couriers: {
                couriersList: [],
                addCourierValidators: createMockString(),
                validated: false,
                activeCourierId: createMockString()
            },
            users: {
                usersList: [],
                addUserValidators: [],
                validated: false
            },
            packages: {
                packagesList: [],
                addPackageValidators: [],
                validated: false,
                activePackageId: createMockString()
            },
            functionality: {
                canWrite: true,
                canRead: true,
                incorrectLoginInputMessage: createMockString(),
                sideBarVisible: true,
                confirmationModalVisible: true,
                mapPopupVisible: true
            },
            registrations: {
                registrationsList: [],
                addRegistrationValidators: [],
                validated: false,
                activeRegistrationId: createMockString()
            }
        });
        AuthService.validate = jest.fn().mockImplementation();
        CourierService.getCouriers = jest.fn().mockImplementation();
        CourierService.addCourier = jest.fn().mockImplementation();
        CourierService.validateCourier = jest.fn().mockImplementation();
        InstructionsService.execute = jest.fn().mockImplementation();
        LocalStorageService.getElement = jest.fn().mockImplementation();
        LocalStorageService.setElement = jest.fn().mockImplementation();
        PackageService.getPackages = jest.fn().mockImplementation();
        PackageService.addPackage = jest.fn().mockImplementation();
        PackageService.validatePackage = jest.fn().mockImplementation();
        RegistrationService.getRegistrations = jest.fn().mockImplementation();
        RegistrationService.addRegistration = jest.fn().mockImplementation();
        RegistrationService.validateRegistration = jest.fn().mockImplementation();
        UserService.getUsers = jest.fn().mockImplementation();
        UserService.addUser = jest.fn().mockImplementation();
        UserService.validateUser = jest.fn().mockImplementation();

        wrapper = mount(<Provider store={store}>
            <App />
        </Provider>);

        expect(wrapper).toBeDefined();
    });
});