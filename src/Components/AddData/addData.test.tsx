import { act, render } from "@testing-library/react"
import { MemoryRouter, Route } from "react-router"
import { InstructionsService } from "../../Services/Instructions.service";
import AddData from "./addData";


describe('addData component', () => {
    let testLocation: any;

    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={['nowy']}>
                <AddData />
                <Route path="*"
                    render={({ location }) => {
                        testLocation = location;
                        return null;
                    }} />
            </MemoryRouter>
        );
    });

    test('clicking add courier', () => {

        act(() => {
            const addCourierButton = document.querySelector('#addCourierBtn');
            addCourierButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(testLocation.pathname).toBe('/nowy/kurier');
    });

    test('clicking add package', () => {

        act(() => {
            const addPackageButton = document.querySelector('#addPackageBtn');
            addPackageButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(testLocation.pathname).toBe('/nowy/przesylka');
    });

    test('clicking add registration', () => {

        act(() => {
            const addRegistrationButton = document.querySelector('#addRegistrationBtn');
            addRegistrationButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(testLocation.pathname).toBe('/nowy/zgloszenie');
    });

    test('clicking add user', () => {

        act(() => {
            const addUserButton = document.querySelector('#addClientBtn');
            addUserButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(testLocation.pathname).toBe('/nowy/klient');
    });
});


