import { act } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from 'enzyme';
import thunk from 'redux-thunk';

import { Package } from "../../../../Store/Models/Package.model";
import { createMockPackage } from "../../../../Store/Models/Package.model.mock";
import { createMockString } from "../../../../Utilities/test.utilities";
import PackagesListElement from "./PackagesListElement";


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('PackageListElement component', () => {
    let store: any;
    let wrapper: ReactWrapper;
    let mockPackage: Package;
    let element: any | ReactWrapper;

    test('is not expanded if inactive', () => {
        mockPackage = createMockPackage();
        store = mockStore({
            packages: {
                activePackageId: createMockString()
            }
        });
        wrapper = mount(<Provider store={store}>
            <PackagesListElement package={mockPackage} />
        </Provider>);

        element = wrapper.find('#panelHeader').hostNodes();
        expect(element.prop('aria-expanded')).toEqual(false);
    });

    test('on click set element to active', () => {
        mockPackage = createMockPackage();
        store = mockStore({
            packages: {
                activeCourierId: createMockString()
            }
        });
        wrapper = mount(<Provider store={store}>
            <PackagesListElement package={mockPackage} />
        </Provider>);
        element = wrapper.find('.packagePanel').hostNodes();
        const expectedPayload = { type: 'packages/setActivePackageId', payload: mockPackage.id };

        act(() => {
            element.prop('onClick')();
        });

        const findAction = store.getActions().find((a: any) => a.type === expectedPayload.type);
        expect(findAction).toBeTruthy();
        expect(findAction.payload).toEqual(expectedPayload.payload);
    });

    test('is expanded if active', () => {
        mockPackage = createMockPackage();
        store = mockStore({
            packages: {
                activePackageId: mockPackage.id
            }
        });
        wrapper = mount(<Provider store={store}>
            <PackagesListElement package={mockPackage} />
        </Provider>);

        element = wrapper.find('#panelHeader').hostNodes();
        expect(element.prop('aria-expanded')).toEqual(true);
    });
});