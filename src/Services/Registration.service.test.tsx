import { act } from "react-test-renderer";
import { createMockRegistration } from "../Store/Models/Registration.model.mock";
import { RegistrationRequest } from "../Store/Models/RegistrationRequest.model";
import { createMockRegistrationRequest } from "../Store/Models/RegistrationRequest.model.mock";
import { CONSTANTS } from "../Utilities/constants";
import { createMockString } from "../Utilities/test.utilities";
import { LocalStorageService } from "./LocalStorage.service";
import { RegistrationService } from "./Registration.service";

describe('Registration Service', () => {
    let mockToken: string;
    let request: RegistrationRequest;

    beforeEach(() => {
        mockToken = createMockString();
        LocalStorageService.getElement = jest.fn(() => mockToken);
        request = createMockRegistrationRequest();
    });

    test('get registrations', async () => {
        const mockResponse = Promise.resolve([createMockRegistration()]);
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
        const endpoint = CONSTANTS.API_ENDPOINT;
        const mockRequest = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": mockToken
            },
        }

        await act(async () => {
            await RegistrationService.getRegistrations();
        });

        expect(global.fetch).toBeCalledWith(`${endpoint}registrations`, mockRequest);
    });

    test('add registration', async () => {
        const mockResponse = Promise.resolve();
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => mockResponse,
                status: 200,
                ok: true,
                headers: new Headers(),
                redirected: false,
                statusText: 'ok',
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
        const endpoint = CONSTANTS.API_ENDPOINT;
        const mockRequest = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": mockToken
            },
            body: JSON.stringify(request),
        }

        await act(async () => {
            await RegistrationService.addRegistration(request);
        });

        expect(global.fetch).toBeCalledWith(`${endpoint}registrations/add-update-registration`, mockRequest);
    });

    test('validate registration', async () => {
        const mockResponse = Promise.resolve();
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => mockResponse,
                status: 200,
                ok: true,
                headers: new Headers(),
                redirected: false,
                statusText: 'ok',
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
        const endpoint = CONSTANTS.API_ENDPOINT;
        const mockRequest = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": mockToken
            },
            body: JSON.stringify(request),
        }

        await act(async () => {
            await RegistrationService.validateRegistration(request);
        });

        expect(global.fetch).toBeCalledWith(`${endpoint}registrations/validate-registration`, mockRequest);
    });
})