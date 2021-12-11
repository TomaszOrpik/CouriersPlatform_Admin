import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from 'enzyme';
import thunk from 'redux-thunk';
import { act } from "react-test-renderer";
import { Provider } from "react-redux";

import { InstructionsService } from "../../Services/Instructions.service";
import { createMockString } from "../../Utilities/test.utilities";
import Login from "./Login";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

///call setState on Password change

describe('Login component', () => {
    let incorrectInputMessage: string;
    let wrapper: ReactWrapper;
    let store: any;

    beforeEach(() => {
        InstructionsService.execute = jest.fn().mockImplementation();
        incorrectInputMessage = createMockString();
        store = mockStore({});
        wrapper = mount(
            <Provider store={store}>
                <Login incorrectInputMessage={incorrectInputMessage} />
            </Provider>)
    });

    test('call setState on login change', () => {
        const loginInput = wrapper.find('#loginInput').hostNodes();
        const someInputValue = { target: { value: createMockString() } };

        act(() => {
            loginInput.simulate('change', someInputValue);
        });
        wrapper.setProps({});

        const errorText = wrapper.find('span.serverValidator').text();
        expect(errorText).toEqual(incorrectInputMessage);
    });

    test('call setState on password change', () => {
        const passwordInput = wrapper.find('#passwordInput').hostNodes();
        const someInputValue = { target: { value: createMockString() } };

        act(() => {
            passwordInput.simulate('change', someInputValue);
        });
        wrapper.setProps({});

        const errorText = wrapper.find('span.serverValidator').text();
        expect(errorText).toEqual(incorrectInputMessage);
    });
});