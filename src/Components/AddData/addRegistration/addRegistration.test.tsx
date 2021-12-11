import { act } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from 'enzyme';
import thunk from 'redux-thunk';

import { Package } from "../../../Store/Models/Package.model";
import { User } from "../../../Store/Models/User.model";
import AddRegistration from './addRegistration';
import { createMockUser } from "../../../Store/Models/User.model.mock";
import { createMockPackage } from "../../../Store/Models/Package.model.mock";
import { InstructionsService } from "../../../Services/Instructions.service";
import { UserService } from "../../../Services/User.service";
import { PackageService } from "../../../Services/Package.service";
import { RegistrationService } from "../../../Services/Registration.service";
import { createMockString, delay } from "../../../Utilities/test.utilities";


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('addRegistration Component', () => {
    let store: any;
    let wrapper: ReactWrapper;
    let inputRegistrationId: any;
    let validateButton: any;
    let addButton: any;
    let mockUsers: User[];
    let mockPackages: Package[];

    beforeEach(() => {
        ({
            store,
            wrapper,
            inputRegistrationId,
            validateButton,
            addButton,
            mockUsers,
            mockPackages
        } = createMockComponent(
            store,
            wrapper,
            inputRegistrationId,
            validateButton,
            addButton,
            mockUsers,
            mockPackages,
            false
        ));
    });

    test('reset validators on empty id', () => {
        RegistrationService.validateRegistration = jest.fn().mockReturnValue([]);
        const expectedPayload = { type: 'registrations/resetAddRegistrationValidators', payload: {} };
        const someValue = 'test';

        act(() => {
            inputRegistrationId.instance().value = someValue;
            inputRegistrationId.simulate('change');
        });

        const findAction = store.getActions().find((a: any) => a.type === expectedPayload.type);
        expect(findAction).toBeTruthy();
    });

    test('validate registration on click', async () => {
        const registrationIdValue = { target: { value: createMockString() } };
        const packageSelectValue = { target: { value: createMockString() } };
        const dateValue = { target: { value: createMockString() } };
        const userValue = { target: { value: createMockString() } };
        const subjectValue = { target: { value: createMockString() } };
        const infoValue = { target: { value: createMockString() } };
        const phoneValue = { target: { value: createMockString() } };
        const mailValue = { target: { value: createMockString() } };

        const registrationIdInput = wrapper.find('#registrationIdInput').hostNodes();
        const packageSelect = wrapper.find('#packageSelect').hostNodes();
        const dateInput = wrapper.find('#dateInput').hostNodes();
        const userSelect = wrapper.find('#userSelect').hostNodes();
        const subjectInput = wrapper.find('#subjectInput').hostNodes();
        const additionalInfoInput = wrapper.find('#additionalInfoInput').hostNodes();
        const contactPhoneInput = wrapper.find('#contactPhoneInput').hostNodes();
        const mailInput = wrapper.find('#mailInput').hostNodes();

        RegistrationService.validateRegistration = jest.fn().mockReturnValue([]);
        const expectedPayload = { type: 'registrations/validate/fulfilled', payload: [] };

        act(() => {
            registrationIdInput.simulate('change', registrationIdValue);
            packageSelect.simulate('change', packageSelectValue);
            dateInput.simulate('change', dateValue);
            userSelect.simulate('change', userValue);
            subjectInput.simulate('change', subjectValue);
            additionalInfoInput.simulate('change', infoValue);
            contactPhoneInput.simulate('change', phoneValue);
            mailInput.simulate('change', mailValue);

            validateButton.prop('onClick')();
        });
        await delay(4000);

        const findAction = store.getActions().find((a: any) => a.type === expectedPayload.type);
        expect(findAction).toBeTruthy();
        expect(findAction.payload).toEqual(expectedPayload.payload);
    });

    test('registration isnt validated', async () => {
        const mockValidationErrors = ['Registration Exist in database'];
        RegistrationService.validateRegistration = jest.fn().mockReturnValue(mockValidationErrors);
        const expectedPayload = { type: 'registrations/validate/fulfilled', payload: mockValidationErrors };

        act(() => {
            validateButton.prop('onClick')();
        });
        await delay(4000);

        const findAction = store.getActions().find((a: any) => a.type === expectedPayload.type);
        expect(findAction).toBeTruthy();
        expect(findAction.payload).toEqual(expectedPayload.payload);
    });

    test('add buttion being disabled before validation', () => {
        RegistrationService.validateRegistration = jest.fn().mockReturnValue([]);

        expect(addButton.prop('disabled')).toEqual(true);
    });

    test('add registration clicked', async () => {
        ({
            store,
            wrapper,
            inputRegistrationId,
            validateButton,
            addButton
        } = createMockComponent(
            store,
            wrapper,
            inputRegistrationId,
            validateButton,
            addButton,
            mockUsers,
            mockPackages,
            true
        ));
        RegistrationService.addRegistration = jest.fn().mockReturnValue({});
        const expectedPayload = { type: 'registrations/add/fulfilled', payload: {} };

        act(() => {
            addButton.prop('onClick')();
        });
        await delay(4000);


        const findAction = store.getActions().find((a: any) => a.type === expectedPayload.type);
        expect(findAction).toBeTruthy();
        expect(findAction.payload).toEqual(expectedPayload.payload);
    });

    test('select package from dropdown populate', async () => {
        const selectPackage = wrapper.find('#packageSelect').hostNodes();

        expect(selectPackage.children().length).toEqual(mockPackages.length);
    });

    test('select user from dropdown populate', async () => {
        const userSelect = wrapper.find('#userSelect').hostNodes();

        expect(userSelect.children().length).toEqual(mockUsers.length);
    });
});

function createMockComponent(
    store: any,
    wrapper: ReactWrapper<{}, {}, React.Component<{}, {}, any>>,
    inputRegistrationId: any,
    validateButton: any,
    addButton: any,
    mockUsers: User[],
    mockPackages: Package[],
    validated: boolean) {
    mockUsers = [createMockUser()];
    mockPackages = [createMockPackage()]
    store = mockStore({
        registrations: {
            addRegistrationValidators: [],
            validated: validated
        },
        packages: {
            packagesList: mockPackages
        },
        users: {
            usersList: mockUsers
        }
    });
    InstructionsService.execute = jest.fn().mockImplementation();
    UserService.getUsers = jest.fn().mockImplementation().mockReturnValue(mockUsers);
    PackageService.getPackages = jest.fn().mockImplementation().mockReturnValue(mockPackages);

    wrapper = mount(<Provider store={store}>
        <AddRegistration />
    </Provider>);

    inputRegistrationId = wrapper.find('#registrationIdInput').hostNodes();
    validateButton = wrapper.find('#validateAddRegistrationBtn').hostNodes();
    addButton = wrapper.find('#addAddRegistrationBtn').hostNodes();
    return { store, wrapper, inputRegistrationId, validateButton, addButton, mockUsers, mockPackages };
}