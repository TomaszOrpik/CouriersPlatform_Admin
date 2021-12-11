import { act } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from 'enzyme';
import thunk from 'redux-thunk';

import { createMockString } from "../../../../Utilities/test.utilities";
import { Courier } from "../../../../Store/Models/Courier.model";
import { createMockCourier } from "../../../../Store/Models/Courier.model.mock";
import CouriersListElement from "./CouriersListElement";


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('CouriersListElement component', () => {
    let store: any;
    let wrapper: ReactWrapper;
    let courier: Courier;
    let element: any | ReactWrapper;

    test('doesnt contain activeId class if inactive', () => {
        courier = createMockCourier();
        store = mockStore({
            couriers: {
                activeCourierId: createMockString()
            }
        });
        wrapper = mount(<Provider store={store}>
            <CouriersListElement courier={courier} />
        </Provider>);

        element = wrapper.find('div.courierNameContainer').hostNodes();
        expect(element).toBeTruthy();
    });

    test('on click set element to active', () => {
        courier = createMockCourier();
        store = mockStore({
            couriers: {
                activeCourierId: createMockString()
            }
        });
        wrapper = mount(<Provider store={store}>
            <CouriersListElement courier={courier} />
        </Provider>);
        element = wrapper.find('div.courierNameContainer').hostNodes();
        const expectedPayload = { type: 'couriers/setActiveCourierId', payload: courier.employeeNumber };

        act(() => {
            element.prop('onClick')();
        });

        const findAction = store.getActions().find((a: any) => a.type === expectedPayload.type);
        expect(findAction).toBeTruthy();
        expect(findAction.payload).toEqual(expectedPayload.payload);
    });

    test('contain activeId class if active', () => {
        courier = createMockCourier();
        store = mockStore({
            couriers: {
                activeCourierId: courier.employeeNumber
            }
        });
        wrapper = mount(<Provider store={store}>
            <CouriersListElement courier={courier} />
        </Provider>);

        element = wrapper.find('div.activeId').hostNodes();
        expect(element).toBeTruthy();
    });
});