import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from 'enzyme';
import thunk from 'redux-thunk';

import { Registration } from "../../Store/Models/Registration.model";
import { createMockRegistration } from "../../Store/Models/Registration.model.mock";
import { InstructionsService } from "../../Services/Instructions.service";
import { RegistrationService } from "../../Services/Registration.service";
import Registrations from "./Registrations";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Registrations componet', () => {
    let store: any;
    let wrapper: ReactWrapper;
    let registrations: Registration[];

    beforeEach(() => {
        registrations = [createMockRegistration()];
        store = mockStore({
            registrations: {
                registrationsList: registrations,
                activeRegistrationId: registrations[0].id
            },
            functionality: {
                canWrite: true
            }
        });
        InstructionsService.execute = jest.fn().mockImplementation();
        RegistrationService.getRegistrations = jest.fn().mockImplementation().mockReturnValue(registrations);

        wrapper = mount(<Provider store={store}>
            <Registrations />
        </Provider>);
    });

    test('show registrations list', () => {
        const result = wrapper.find('#registrationsList').hostNodes();

        expect(result).toBeDefined();
    });

    test('show registration details', () => {
        const result = wrapper.find('.detailsPart').hostNodes();

        expect(result).toBeDefined();
    });
});