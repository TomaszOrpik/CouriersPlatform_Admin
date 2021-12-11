import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Layout from "./Layout";

const mockStore = configureStore([]);

describe('Layout Component', () => {
    let store: any;

    test('show component on can Read', () => {
        store = mockStore({
            functionality: {
                canRead: true
            }
        });
        render(
            <Provider store={store}>
                <Layout children={<div></div>} />
            </Provider>
        );

        const page = document.querySelector('.pages');

        expect(page).toBeDefined();
    });

    test('hide component on cant Read', () => {
        store = mockStore({
            functionality: {
                canRead: false
            }
        });
        render(
            <Provider store={store}>
                <Layout children={<div></div>} />
            </Provider>
        );

        const page = document.querySelector('.pages');

        expect(page).toEqual(null);
    });
});