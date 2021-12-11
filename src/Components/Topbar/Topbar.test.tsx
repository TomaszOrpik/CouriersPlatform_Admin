import { act, render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Topbar from "./Topbar";

const mockStore = configureStore([]);

describe('Topbar component', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({});
        render(
            <Provider store={store}>
                <Topbar />
            </Provider>
        );
    });

    test('clicking logout button', () => {
        const logoutBtn = document.querySelector('#logoutBtn');

        act(() => {
            logoutBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        const expectedPayload = { type: 'functionality/logoutUser', payload: {} };
        expect(store.getActions()).toEqual([expectedPayload]);
    })
})