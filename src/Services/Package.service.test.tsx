import { act } from "react-test-renderer";
import { createMockPackage } from "../Store/Models/Package.model.mock";
import { PackageRequest } from "../Store/Models/PackageRequest.model";
import { createMockPackageRequest } from "../Store/Models/PackageRequest.model.mock";
import { CONSTANTS } from "../Utilities/constants";
import { createMockString } from "../Utilities/test.utilities";
import { LocalStorageService } from "./LocalStorage.service";
import { PackageService } from "./Package.service";

describe('Package Service', () => {
    let mockToken: string;
    let request: PackageRequest;

    beforeEach(() => {
        mockToken = createMockString();
        LocalStorageService.getElement = jest.fn(() => mockToken);
        request = createMockPackageRequest();
    });

    test('get packages', async () => {
        const mockResponse = Promise.resolve([createMockPackage()]);
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
            await PackageService.getPackages();
        });

        expect(global.fetch).toBeCalledWith(`${endpoint}packages`, mockRequest);
    });

    test('add package', async () => {
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
            await PackageService.addPackage(request);
        });

        expect(global.fetch).toBeCalledWith(`${endpoint}packages/add-update-package`, mockRequest);
    });

    test('validate package', async () => {
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
            await PackageService.validatePackage(request);
        });

        expect(global.fetch).toBeCalledWith(`${endpoint}packages/validate-package`, mockRequest);
    });
});