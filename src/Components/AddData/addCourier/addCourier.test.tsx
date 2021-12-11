import { act } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from 'enzyme';
import thunk from 'redux-thunk';

import { InstructionsService } from "../../../Services/Instructions.service";
import AddCourier from "./addCourier";
import { CourierService } from "../../../Services/Courier.service";
import { createMockString, delay } from "../../../Utilities/test.utilities";


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('AddCourier Component', () => {
    let store: any;
    let wrapper: ReactWrapper;
    let inputEmployeeNumber: any;
    let validateButton: any;
    let addButton: any;

    beforeEach(() => {
        ({
            store,
            wrapper,
            inputEmployeeNumber,
            validateButton,
            addButton
        } = createMockComponent(
            store,
            wrapper,
            inputEmployeeNumber,
            validateButton,
            addButton,
            false
        ));
    });

    test('reset validators on empty employeeNumber', () => {
        CourierService.validateCourier = jest.fn().mockReturnValue([]);
        const expectedPayload = { type: 'couriers/resetAddCourierValidators', payload: {} };
        const someValue = 'test';

        act(() => {
            inputEmployeeNumber.instance().value = someValue;
            inputEmployeeNumber.simulate('change');
        });

        const findAction = store.getActions().find((a: any) => a.type === expectedPayload.type);
        expect(findAction).toBeTruthy();
    });

    test('validate courier on click', async () => {
        const someEmployeeNumberValue = { target: { value: createMockString() } };
        const someNameValue = { target: { value: createMockString() } };
        const someSurnameValue = { target: { value: createMockString() } };
        const passwordValue = { target: { value: createMockString() } };
        const vehicleValue = { target: { value: createMockString() } };
        const registrationValue = { target: { value: createMockString() } };
        const phoneValue = { target: { value: createMockString() } };
        const startLatValue = { target: { value: createMockString() } };
        const startLongValue = { target: { value: createMockString() } };
        const regionNameValue = { target: { value: createMockString() } };
        const leftTopLatValue = { target: { value: createMockString() } };
        const leftTopLongValue = { target: { value: createMockString() } };
        const leftBottomLatValue = { target: { value: createMockString() } };
        const leftBottomLongValue = { target: { value: createMockString() } };
        const rightTopLatValue = { target: { value: createMockString() } };
        const rightTopLongValue = { target: { value: createMockString() } };
        const rightBottomLatValue = { target: { value: createMockString() } };
        const rightBottomLongValue = { target: { value: createMockString() } };

        const employeeNumberInput = wrapper.find('#employeeNumberInput').hostNodes();
        const nameInput = wrapper.find('#firstNameInput').hostNodes();
        const surnameInput = wrapper.find('#secondNameInput').hostNodes();
        const passwordInput = wrapper.find('#passwordInput').hostNodes();
        const vehicleInput = wrapper.find("#vehicleInput").hostNodes();
        const registrationInput = wrapper.find('#registrationInput').hostNodes();
        const phoneInput = wrapper.find('#phoneInput').hostNodes();
        const startLatInput = wrapper.find('#startLatInput').hostNodes();
        const startLongInput = wrapper.find('#startLongInput').hostNodes();
        const regionNameInput = wrapper.find('#regionNameInput').hostNodes();
        const leftTopLatInput = wrapper.find('#leftTopLatInput').hostNodes();
        const leftTopLongInput = wrapper.find('#leftTopLongInput').hostNodes();
        const leftBottomLatInput = wrapper.find('#leftBottomLatInput').hostNodes();
        const leftBottomLogInput = wrapper.find('#leftBottomLogInput').hostNodes();
        const rightTopLatInput = wrapper.find('#rightTopLatInput').hostNodes();
        const rightTopLongInput = wrapper.find('#rightTopLongInput').hostNodes();
        const rightBotLatInput = wrapper.find('#rightBotLatInput').hostNodes();
        const rightBotLongInput = wrapper.find('#rightBotLongInput').hostNodes();

        CourierService.validateCourier = jest.fn().mockReturnValue([]);
        const expectedPayload = { type: 'couriers/validate/fulfilled', payload: [] };

        act(() => {
            employeeNumberInput.simulate('change', someEmployeeNumberValue);
            nameInput.simulate('change', someNameValue);
            surnameInput.simulate('change', someSurnameValue);
            passwordInput.simulate('change', passwordValue);
            vehicleInput.simulate('change', vehicleValue);
            registrationInput.simulate('change', registrationValue);
            phoneInput.simulate('change', phoneValue);
            startLatInput.simulate('change', startLatValue);
            startLongInput.simulate('change', startLongValue);
            regionNameInput.simulate('change', regionNameValue);
            leftTopLatInput.simulate('change', leftTopLatValue);
            leftTopLongInput.simulate('change', leftTopLongValue);
            leftBottomLatInput.simulate('change', leftBottomLatValue);
            leftBottomLogInput.simulate('change', leftBottomLongValue);
            rightTopLatInput.simulate('change', rightTopLatValue);
            rightTopLongInput.simulate('change', rightTopLongValue);
            rightBotLatInput.simulate('change', rightBottomLatValue);
            rightBotLongInput.simulate('change', rightBottomLongValue);

            validateButton.prop('onClick')();
        });
        await delay(4000);

        const findAction = store.getActions().find((a: any) => a.type === expectedPayload.type);
        expect(findAction).toBeTruthy();
        expect(findAction.payload).toEqual(expectedPayload.payload);

    });

    test('courier isnt validated', async () => {
        const mockValidationErrors = ['Courier Exist in database'];
        CourierService.validateCourier = jest.fn().mockReturnValue(mockValidationErrors);
        const expectedPayload = { type: 'couriers/validate/fulfilled', payload: mockValidationErrors };

        act(() => {
            validateButton.prop('onClick')();
        });
        await delay(4000);

        const findAction = store.getActions().find((a: any) => a.type === expectedPayload.type);
        expect(findAction).toBeTruthy();
        expect(findAction.payload).toEqual(expectedPayload.payload);
    });

    test('add button being disabled before validation', () => {
        CourierService.validateCourier = jest.fn().mockReturnValue([]);

        expect(addButton.prop('disabled')).toEqual(true);
    });

    test('add courier clicked', async () => {
        ({
            store,
            wrapper,
            inputEmployeeNumber,
            validateButton,
            addButton
        } = createMockComponent(
            store,
            wrapper,
            inputEmployeeNumber,
            validateButton,
            addButton,
            true
        ));
        CourierService.addCourier = jest.fn().mockReturnValue({});
        const expectedPayload = { type: 'couriers/add/fulfilled', payload: {} };

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
    inputEmployeeNumber: any,
    validateButton: any,
    addButton: any,
    validated: boolean) {
    store = mockStore({
        couriers: {
            addCourierValidators: [],
            validated: validated
        }
    });
    InstructionsService.execute = jest.fn().mockImplementation();

    wrapper = mount(<Provider store={store}>
        <AddCourier />
    </Provider>);

    inputEmployeeNumber = wrapper.find('#employeeNumberAddCourier').hostNodes();
    validateButton = wrapper.find('#validateAddCourierBtn').hostNodes();
    addButton = wrapper.find('#addAddCourierBtn').hostNodes();
    return { store, wrapper, inputEmployeeNumber, validateButton, addButton };
}