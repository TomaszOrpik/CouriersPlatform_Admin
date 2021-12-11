import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from 'enzyme';
import thunk from 'redux-thunk';
import { act } from "react-test-renderer";
import { Provider } from "react-redux";
import { createMockString, delay } from "../../../Utilities/test.utilities";
import LoginSubmitButton from "./LoginSubmitButton";
import { AuthService } from "../../../Services/Auth.service";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('loginSubmit button', () => {
    let wrapper: ReactWrapper;
    let store: any;
    let id: string;
    let login: string;
    let password: string;
    let disabled: boolean;

    beforeEach(() => {
        id = createMockString();
        login = createMockString();
        password = createMockString();
        disabled = false;

        store = mockStore({});
        AuthService.validate = jest.fn().mockImplementation().mockResolvedValue(true);
        wrapper = mount(
            <Provider store={store}>
                <LoginSubmitButton
                    isDisabled={disabled}
                    login={login}
                    password={password}
                    id={id} />
            </Provider>)
    });

    test('submit', async () => {
        const expectedPayload = { type: 'functionality/authenticate/fulfilled', payload: true };
        const element: any = wrapper.find('.loginBtn').hostNodes();

        act(() => {
            element.prop('onClick')();
        });
        await delay(4000);

        const findAction = store.getActions().find((a: any) => a.type === expectedPayload.type);
        expect(findAction).toBeTruthy();
    });
});