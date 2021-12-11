import { act } from "react-test-renderer";
import { User } from "../Store/Models/User.model";
import { createMockUser } from "../Store/Models/User.model.mock";
import { CONSTANTS } from "../Utilities/constants";
import { createMockString } from "../Utilities/test.utilities";
import { LocalStorageService } from "./LocalStorage.service";
import { UserService } from "./User.service";

describe('User Service', () => {
    let mockToken: string;
    let request: User;

    beforeEach(() => {
        mockToken = createMockString();
        LocalStorageService.getElement = jest.fn(() => mockToken);
        request = createMockUser();
    });

    test('get users', async () => {
        const mockResponse = Promise.resolve([createMockUser()]);
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
            await UserService.getUsers();
        });

        expect(global.fetch).toBeCalledWith(`${endpoint}users`, mockRequest);
    });

    test('add user', async () => {
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
            await UserService.addUser(request);
        });

        expect(global.fetch).toBeCalledWith(`${endpoint}users/add-update-user`, mockRequest);
    });

    test('validate user', async () => {
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
            await UserService.validateUser(request);
        });

        expect(global.fetch).toBeCalledWith(`${endpoint}users/validate-user`, mockRequest);
    });
});