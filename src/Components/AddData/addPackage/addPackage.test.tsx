import { act } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from 'enzyme';
import thunk from 'redux-thunk';

import { InstructionsService } from "../../../Services/Instructions.service";
import { PackageService } from "../../../Services/Package.service";
import { createMockString, delay } from "../../../Utilities/test.utilities";
import AddPackage from './addPackage';
import { createMockUser } from "../../../Store/Models/User.model.mock";
import { UserService } from "../../../Services/User.service";
import { User } from "../../../Store/Models/User.model";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('addPackage Component', () => {
    let store: any;
    let wrapper: ReactWrapper;
    let inputPackageId: any;
    let validateButton: any;
    let addButton: any;
    let mockUsers: User[];

    beforeEach(() => {
        ({
            store,
            wrapper,
            inputPackageId,
            validateButton,
            addButton,
            mockUsers
        } = createMockComponent(
            store,
            wrapper,
            inputPackageId,
            validateButton,
            addButton,
            mockUsers,
            false
        ));
    });

    test('reset validators on empty id', () => {
        PackageService.validatePackage = jest.fn().mockReturnValue([]);
        const expectedPayload = { type: 'packages/resetAddPackageValidators', payload: {} };
        const someValue = 'test';

        act(() => {
            inputPackageId.instance().value = someValue;
            inputPackageId.simulate('change');
        });

        const findAction = store.getActions().find((a: any) => a.type === expectedPayload.type);
        expect(findAction).toBeTruthy();
    });

    test('validate package on click', async () => {
        const packageIdValue = { target: { value: createMockString() } };
        const packageNumberValue = { target: { value: createMockString() } };
        const dateValue = { target: { value: createMockString() } };
        const additionalInfoValue = { target: { value: createMockString() } };
        const senderValue = { target: { value: createMockString() } };
        const receiverValue = { target: { value: createMockString() } };
        const postionLatValue = { target: { value: createMockString() } };
        const positionLongValue = { target: { value: createMockString() } };

        const packageIdInput = wrapper.find('#packageIdInput').hostNodes();
        const packageNumberInput = wrapper.find('#packageNumberInput').hostNodes();
        const dateInput = wrapper.find('#dateInput').hostNodes();
        const commentInput = wrapper.find('#commentInput').hostNodes();
        const senderSelect = wrapper.find('#senderSelect').hostNodes();
        const receiverSelect = wrapper.find('#receiverSelect').hostNodes();
        const posLatInput = wrapper.find('#posLatInput').hostNodes();
        const posLongInput = wrapper.find('#posLongInput').hostNodes();

        PackageService.validatePackage = jest.fn().mockReturnValue([]);
        const expectedPayload = { type: 'packages/validate/fulfilled', payload: [] };

        act(() => {
            packageIdInput.simulate('change', packageIdValue);
            packageNumberInput.simulate('change', packageNumberValue);
            dateInput.simulate('change', dateValue);
            commentInput.simulate('change', additionalInfoValue);
            senderSelect.simulate('change', senderValue);
            receiverSelect.simulate('change', receiverValue);
            posLatInput.simulate('change', postionLatValue);
            posLongInput.simulate('change', positionLongValue);

            validateButton.prop('onClick')();
        });
        await delay(4000);

        const findAction = store.getActions().find((a: any) => a.type === expectedPayload.type);
        expect(findAction).toBeTruthy();
        expect(findAction.payload).toEqual(expectedPayload.payload);
    });

    test('package isnt validated', async () => {
        const mockValidationErrors = ['Package Exist in database'];
        PackageService.validatePackage = jest.fn().mockReturnValue(mockValidationErrors);
        const expectedPayload = { type: 'packages/validate/fulfilled', payload: mockValidationErrors };

        act(() => {
            validateButton.prop('onClick')();
        });
        await delay(4000);

        const findAction = store.getActions().find((a: any) => a.type === expectedPayload.type);
        expect(findAction).toBeTruthy();
        expect(findAction.payload).toEqual(expectedPayload.payload);
    });

    test('add button being disabled before validation', () => {
        PackageService.validatePackage = jest.fn().mockReturnValue([]);

        expect(addButton.prop('disabled')).toEqual(true);
    });

    test('add package clicked', async () => {
        ({
            store,
            wrapper,
            inputPackageId,
            validateButton,
            addButton
        } = createMockComponent(
            store,
            wrapper,
            inputPackageId,
            validateButton,
            addButton,
            mockUsers,
            true
        ));
        PackageService.addPackage = jest.fn().mockReturnValue({});
        const expectedPayload = { type: 'packages/add/fulfilled', payload: {} };

        act(() => {
            addButton.prop('onClick')();
        });
        await delay(4000);


        const findAction = store.getActions().find((a: any) => a.type === expectedPayload.type);
        expect(findAction).toBeTruthy();
        expect(findAction.payload).toEqual(expectedPayload.payload);
    });

    test('select sender from dropdown populate', async () => {
        const selectSender = wrapper.find('#senderSelect').hostNodes();

        expect(selectSender.children().length).toEqual(mockUsers.length);
    });

    test('select receiver from dropdown populate', async () => {
        const selectReceiver = wrapper.find('#receiverSelect').hostNodes();

        expect(selectReceiver.children().length).toEqual(mockUsers.length);
    });

});

function createMockComponent(
    store: any,
    wrapper: ReactWrapper<{}, {}, React.Component<{}, {}, any>>,
    inputPackageId: any,
    validateButton: any,
    addButton: any,
    mockUsers: User[],
    validated: boolean) {
    mockUsers = [createMockUser()];
    store = mockStore({
        packages: {
            addPackageValidators: [],
            validated: validated
        },
        users: {
            usersList: mockUsers
        }
    });
    InstructionsService.execute = jest.fn().mockImplementation();
    UserService.getUsers = jest.fn().mockImplementation().mockReturnValue(mockUsers);

    wrapper = mount(<Provider store={store}>
        <AddPackage />
    </Provider>);

    inputPackageId = wrapper.find('#packageIdInput').hostNodes();
    validateButton = wrapper.find('#validateAddPackageBtn').hostNodes();
    addButton = wrapper.find('#addAddPackageBtn').hostNodes();
    return { store, wrapper, inputPackageId, validateButton, addButton, mockUsers };
}