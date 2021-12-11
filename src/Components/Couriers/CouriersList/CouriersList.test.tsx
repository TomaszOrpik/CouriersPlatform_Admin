import { act } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from 'enzyme';
import thunk from 'redux-thunk';

import { Courier } from "../../../Store/Models/Courier.model";
import { createMockCourier } from "../../../Store/Models/Courier.model.mock";
import CouriersList from "./CouriersList";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('CouriersList component', () => {
    let wrapper: ReactWrapper;
    let mockCouriers: Courier[];
    let store: any;

    beforeEach(() => {
        mockCouriers = [
            createMockCourier(),
            createMockCourier(),
            createMockCourier()
        ];
        store = mockStore({
            couriers: {
                activeCourierId: mockCouriers[0].employeeNumber
            }
        });
        wrapper = mount(<Provider store={store}>
            <CouriersList couriers={mockCouriers} />
        </Provider>);
    });

    test('display couriers list', () => {
        const couriersListBody = wrapper.find('div.listBody').hostNodes();

        expect(couriersListBody.children().length).toEqual(mockCouriers.length);
    });

    test('filter couriers list on search input', () => {
        const searchInput = wrapper.find('#courierFilterInput').hostNodes();
        const searchedEmployeeNumber = mockCouriers[0].employeeNumber;
        const someInputValue = { target: { value: searchedEmployeeNumber } };
        const mockCouriersFiltered = mockCouriers.filter((c) => c.employeeNumber === searchedEmployeeNumber);

        act(() => {
            searchInput.simulate('change', someInputValue);
        });

        wrapper.setProps({});
        const couriersListBody = wrapper.find('div.listBody').hostNodes();
        expect(couriersListBody.children().length).toEqual(mockCouriersFiltered.length);
    });
});
