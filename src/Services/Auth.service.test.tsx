import { act } from "@testing-library/react";
import { CONSTANTS } from "../Utilities/constants";
import { createMockString } from "../Utilities/test.utilities";
import { AuthService } from "./Auth.service";
import { LocalStorageService } from "./LocalStorage.service";

describe('Auth Service', () => {

    test('should validate user', async () => {
        LocalStorageService.setElement = jest.fn().mockImplementation();
        const mockResponse = Promise.resolve({
            token: {
                userToken: createMockString(),
                mapToken: createMockString()
            },
            canWrite: true
        });
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => mockResponse,
                status: 200,
                ok: true,
                headers: new Headers(),
                redirected: false,
                statusText: '',
                type: {} as ResponseType,
                url: '',
                clone: () => new Response(),
                body: null,
                bodyUsed: false,
                arrayBuffer: () => new Promise(() => { }),
                blob: () => new Promise(() => new Blob()),
                formData: () => new Promise(() => new FormData()),
                text: () => new Promise(() => '')
            }));
        const mockLogin = createMockString();
        const mockPassword = createMockString();
        const endpoint = CONSTANTS.API_ENDPOINT;
        const mockRequest = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                login: mockLogin,
                password: mockPassword
            }),
        }

        await act(async () => {
            await AuthService.validate(mockLogin, mockPassword);
        });

        expect(global.fetch).toBeCalledWith(`${endpoint}users/login_admin`, mockRequest);
    });

    test('return undefined on validation failed', async () => {
        LocalStorageService.setElement = jest.fn().mockImplementation();
        const mockResponse = Promise.resolve(undefined);
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => mockResponse,
                status: 200,
                ok: true,
                headers: new Headers(),
                redirected: false,
                statusText: '',
                type: {} as ResponseType,
                url: '',
                clone: () => new Response(),
                body: null,
                bodyUsed: false,
                arrayBuffer: () => new Promise(() => { }),
                blob: () => new Promise(() => new Blob()),
                formData: () => new Promise(() => new FormData()),
                text: () => new Promise(() => '')
            }));
        const mockLogin = createMockString();
        const mockPassword = createMockString();
        let result;

        await act(async () => {
            result = await AuthService.validate(mockLogin, mockPassword);
        });

        expect(result).toEqual(undefined);
    });
});