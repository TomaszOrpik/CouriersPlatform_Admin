import { act } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from 'enzyme';
import thunk from 'redux-thunk';

import { Courier } from "../../Store/Models/Courier.model";
import { InstructionsService } from "../../Services/Instructions.service";
import { CourierService } from "../../Services/Courier.service";
import Couriers from "./Couriers";
import { LocalStorageService } from "../../Services/LocalStorage.service";
import { createMockString } from "../../Utilities/test.utilities";
import { createMockCourier } from "../../Store/Models/Courier.model.mock";
import { CONSTANTS } from "../../Utilities/constants";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Couriers component', () => {
    const mapEndpoint = CONSTANTS.MAP_ENDPOINT;
    let store: any;
    let wrapper: ReactWrapper;
    let couriers: Courier[];
    let mapToken: string;

    beforeEach(() => {
        couriers = [createMockCourier()];
        mapToken = createMockString();
        store = mockStore({
            couriers: {
                couriersList: couriers,
                activeCourierId: couriers[0].employeeNumber
            },
            functionality: {
                canWrite: true
            }
        });
        InstructionsService.execute = jest.fn().mockImplementation();
        CourierService.getCouriers = jest.fn().mockImplementation().mockReturnValue(couriers);
        LocalStorageService.getElement = jest.fn().mockImplementation().mockReturnValue(mapToken);

        wrapper = mount(<Provider store={store}>
            <Couriers />
        </Provider>);
    });

    test('show iFrame', () => {
        const mapContainer = wrapper.find('#mapContainer').hostNodes();
        const mapUrl = `${mapEndpoint}?type=courier&id=${couriers[0].employeeNumber}&token=${mapToken}`;
        let iFrame: any;

        act(() => {
            iFrame = mapContainer.find('iframe');
        });

        expect(iFrame.prop('src')).toEqual(mapUrl);
    });

    test('show open info box on component load', () => {
        const infoBox = wrapper.find('#infoBox').hostNodes();

        const closeBtn = infoBox.find('div.closeInfo.material-icons');
        expect(closeBtn).toBeTruthy();
    });

    test('hide infoBox on close', () => {
        const infoBox = wrapper.find('#infoBox').hostNodes();
        const closeBtn: any = infoBox.find('div.closeInfo.material-icons');

        act(() => {
            closeBtn.prop('onClick')();
        });

        const openBtn = infoBox.find('div.openInfo.material-icons');
        expect(openBtn).toBeTruthy();
    });
});
