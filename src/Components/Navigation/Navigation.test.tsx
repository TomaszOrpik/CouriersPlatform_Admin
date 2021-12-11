import configureStore from "redux-mock-store";
import { Provider } from 'react-redux';
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route } from "react-router";
import Navigation from "./Navigation";
import styles from "./Navigation.module.scss";

const mockStore = configureStore([]);

describe('Navigation', () => {
    let testLocation: any;
    let store: any;

    beforeEach(() => {
        store = mockStore({
            functionality: {
                canWrite: true
            }
        });
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <Navigation />
                    <Route path="*"
                        render={({ location }) => {
                            testLocation = location;
                            return null;
                        }} />
                </MemoryRouter>
            </Provider>
        );
    });

    test('clicking couriers', () => {
        const couriersBtn = document.querySelector('#couriersPageBtn');

        act(() => {
            couriersBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(testLocation.pathname).toBe('/kurierzy');
        expect(couriersBtn?.className).toContain('active');
    });

    test('clicking packages', () => {
        const packagesBtn = document.querySelector('#packagesPageBtn');

        act(() => {
            packagesBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(testLocation.pathname).toBe('/przesylki');
        expect(packagesBtn?.className).toContain('active');
    });

    test('clicking registrations', () => {
        const registrationsBtn = document.querySelector('#registrationsPageBtn');

        act(() => {
            registrationsBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(testLocation.pathname).toBe('/powiadomienia');
        expect(registrationsBtn?.className).toContain('active');
    });

    test('clicking add', () => {
        const addBtn = document.querySelector('#addPageBtn');

        act(() => {
            addBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(testLocation.pathname).toBe('/nowy');
        expect(addBtn?.className).toContain('active');
    });
});