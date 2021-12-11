import { act } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from 'enzyme';
import thunk from 'redux-thunk';

import Packages from './Packages';
import { InstructionsService } from "../../Services/Instructions.service";
import { LocalStorageService } from "../../Services/LocalStorage.service";
import { PackageService } from "../../Services/Package.service";
import { Package } from "../../Store/Models/Package.model";
import { createMockPackage } from "../../Store/Models/Package.model.mock";
import { CONSTANTS } from "../../Utilities/constants";
import { createMockString } from "../../Utilities/test.utilities";



const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Packages component', () => {
    const mapEndpoint = CONSTANTS.MAP_ENDPOINT;
    let store: any;
    let wrapper: ReactWrapper;
    let packages: Package[];
    let mapToken: string;

    beforeEach(() => {
        packages = [createMockPackage()];
        mapToken = createMockString();
        store = mockStore({
            packages: {
                packagesList: packages,
                activePackageId: packages[0].id
            },
            functionality: {
                canWrite: true
            }
        });
        InstructionsService.execute = jest.fn().mockImplementation();
        PackageService.getPackages = jest.fn().mockImplementation().mockReturnValue(packages);
        LocalStorageService.getElement = jest.fn().mockImplementation().mockReturnValue(mapToken);

        wrapper = mount(<Provider store={store}>
            <Packages />
        </Provider>);
    });

    test('show map iFrame', () => {
        const mapContainer = wrapper.find('#mapContainer').hostNodes();
        const mapUrl = `${mapEndpoint}?type=package&id=${packages[0].id}&token=${mapToken}`;
        let iFrame: any;

        act(() => {
            iFrame = mapContainer.find('iframe');
        });

        expect(iFrame.prop('src')).toEqual(mapUrl);
    });
});