import { act } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from 'enzyme';
import thunk from 'redux-thunk';


import AddClient from "./addClient";
import { UserService } from "../../../Services/User.service";
import { InstructionsService } from "../../../Services/Instructions.service";
import { createMockString, delay } from "../../../Utilities/test.utilities";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('AddClient Component', () => {
    let store: any;
    let wrapper: ReactWrapper;
    let inputId: any;
    let validateButton: any;
    let addButton: any;

    beforeEach(() => {
        ({
            store,
            wrapper,
            inputId,
            validateButton,
            addButton
        } = createMockComponent(
            store,
            wrapper,
            inputId,
            validateButton,
            addButton,
            false
        ));
    });

    test('reset validators on empty id', () => {
        UserService.validateUser = jest.fn().mockReturnValue([]);
        const expectedPayload = { type: 'users/resetAddUserValidators', payload: {} };
        const someValue = 'test';

        act(() => {
            inputId.instance().value = someValue;
            inputId.simulate('change');
        });

        const findAction = store.getActions().find((a: any) => a.type === expectedPayload.type);
        expect(findAction).toBeTruthy();
    });

    test('validate user on click', async () => {
        const someIdInputValue = { target: { value: createMockString() } };
        const someNameInputValue = { target: { value: createMockString() } };
        const someSurnameValue = { target: { value: createMockString() } };
        const somePasswordValue = { traget: { value: createMockString() } };
        const someStreetValue = { target: { value: createMockString() } };
        const somePostCodeValue = { target: { value: createMockString() } };
        const someCityValue = { target: { value: createMockString() } };
        const somePhoneValue = { target: { value: createMockString() } };

        const idInput = wrapper.find('#idInput').hostNodes();
        const nameInput = wrapper.find('#firstNameInput').hostNodes();
        const surnameInput = wrapper.find('#secondNameInput').hostNodes();
        const passwordInput = wrapper.find('#passwordInput').hostNodes();
        const streetInput = wrapper.find('#streetInput').hostNodes();
        const postCodeInput = wrapper.find('#postcodeInput').hostNodes();
        const cityInput = wrapper.find('#cityInput').hostNodes();
        const phoneInput = wrapper.find('#phoneInput').hostNodes();

        UserService.validateUser = jest.fn().mockReturnValue([]);
        const expectedPayload = { type: 'users/validate/fulfilled', payload: [] };

        act(() => {
            idInput.simulate('change', someIdInputValue);
            nameInput.simulate('change', someNameInputValue);
            surnameInput.simulate('change', someSurnameValue);
            passwordInput.simulate('change', somePasswordValue);
            streetInput.simulate('change', someStreetValue);
            postCodeInput.simulate('change', somePostCodeValue);
            cityInput.simulate('change', someCityValue);
            phoneInput.simulate('change', somePhoneValue);


            validateButton.prop('onClick')();
        });
        await delay(4000);

        const findAction = store.getActions().find((a: any) => a.type === expectedPayload.type);
        expect(findAction).toBeTruthy();
        expect(findAction.payload).toEqual(expectedPayload.payload);
    });

    test('user isnt validated', async () => {
        const mockValidationErrors = ['User Exist in database'];
        UserService.validateUser = jest.fn().mockReturnValue(mockValidationErrors);
        const expectedPayload = { type: 'users/validate/fulfilled', payload: mockValidationErrors };

        act(() => {
            validateButton.prop('onClick')();
        });
        await delay(4000);

        const findAction = store.getActions().find((a: any) => a.type === expectedPayload.type);
        expect(findAction).toBeTruthy();
        expect(findAction.payload).toEqual(expectedPayload.payload);
    })

    test('add button being disabled before validation', () => {
        UserService.validateUser = jest.fn().mockReturnValue([]);

        expect(addButton.prop('disabled')).toEqual(true);
    });

    test('add user clicked', async () => {
        ({
            store,
            wrapper,
            inputId,
            validateButton,
            addButton
        } = createMockComponent(
            store,
            wrapper,
            inputId,
            validateButton,
            addButton,
            true
        ));
        UserService.addUser = jest.fn().mockReturnValue({});
        const expectedPayload = { type: 'users/add/fulfilled', payload: {} };

        act(() => {
            addButton.prop('onClick')();
        });
        await delay(4000);


        const findAction = store.getActions().find((a: any) => a.type === expectedPayload.type);
        expect(findAction).toBeTruthy();
        expect(findAction.payload).toEqual(expectedPayload.payload);
    });
});

function createMockComponent(
    store: any,
    wrapper: ReactWrapper<{}, {}, React.Component<{}, {}, any>>,
    inputId: any,
    validateButton: any,
    addButton: any,
    validated: boolean) {
    store = mockStore({
        users: {
            addUserValidators: [],
            validated: validated
        }
    });
    InstructionsService.execute = jest.fn().mockImplementation();

    wrapper = mount(<Provider store={store}>
        <AddClient />
    </Provider>);

    inputId = wrapper.find('#idInput').hostNodes();
    validateButton = wrapper.find('#validateAddClient').hostNodes();
    addButton = wrapper.find('#addAddClient').hostNodes();
    return { store, wrapper, inputId, validateButton, addButton };
}
