import { act } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from 'enzyme';
import thunk from 'redux-thunk';

import { Registration } from "../../../Store/Models/Registration.model";
import { createMockRegistration } from "../../../Store/Models/Registration.model.mock";
import RegistrationsList from "./RegistrationsList";


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('RegistrationsList component', () => {
    let wrapper: ReactWrapper;
    let mockRegistrations: Registration[];
    let store: any;

    beforeEach(() => {
        mockRegistrations = [
            createMockRegistration(),
            createMockRegistration()
        ];

        store = mockStore({});

        wrapper = mount(<Provider store={store}>
            <RegistrationsList registrations={mockRegistrations} />
        </Provider>);
    });

    test('show registrations list', () => {
        const dataGrid = wrapper.find('.datagridAdditionalStyles').hostNodes();

        expect(dataGrid.prop('aria-rowcount')).toEqual(mockRegistrations.length);
    });

    test('set registration to active on click', () => {
        const dataGrid = wrapper.find('.datagridAdditionalStyles').hostNodes();
        const selector = `[data-value="${mockRegistrations[0].id}"]`;
        const expectedPayload = { type: 'registrations/setActiveRegistrationId', payload: mockRegistrations[0].id };


        const element = dataGrid.find('.MuiDataGrid-cell').hostNodes();
        const cell = element.find(selector).hostNodes();

        act(() => {
            cell.simulate('click');
        });

        const findAction = store.getActions().find((a: any) => a.type === expectedPayload.type);
        expect(findAction).toBeTruthy();
        expect(findAction.payload).toEqual(expectedPayload.payload);
    });
});