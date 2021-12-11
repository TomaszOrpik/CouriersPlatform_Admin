import { act } from "react-test-renderer";
import { Courier } from "../Store/Models/Courier.model";
import { createMockCourier } from "../Store/Models/Courier.model.mock";
import { CourierRequest } from "../Store/Models/CourierRequest.model";
import { createMockCourierRequest } from "../Store/Models/CourierRequest.model.mock";
import { CONSTANTS } from "../Utilities/constants";
import { createMockString } from "../Utilities/test.utilities";
import { CourierService } from "./Courier.service";
import { LocalStorageService } from "./LocalStorage.service";

describe('Courier Service', () => {
    let mockToken: string;
    let request: CourierRequest;

    beforeEach(() => {
        mockToken = createMockString();
        LocalStorageService.getElement = jest.fn(() => mockToken);
        request = createMockCourierRequest();
    });

    test('get couriers', async () => {
        const mockResponse = Promise.resolve([createMockCourier()]);
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
            await CourierService.getCouriers();
        });

        expect(global.fetch).toBeCalledWith(`${endpoint}couriers`, mockRequest);
    });

    test('add courier', async () => {
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
            await CourierService.addCourier(request);
        });

        expect(global.fetch).toBeCalledWith(`${endpoint}couriers/add-update-courier`, mockRequest);
    });

    test('validate courier', async () => {
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
            await CourierService.validateCourier(request);
        });

        expect(global.fetch).toBeCalledWith(`${endpoint}couriers/validate-courier`, mockRequest);
    });
});