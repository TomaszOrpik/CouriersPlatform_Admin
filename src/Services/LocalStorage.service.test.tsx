import { createMockString } from "../Utilities/test.utilities";
import { LocalStorageService } from "./LocalStorage.service";

describe('localStorage service', () => {
    const someMockValue = createMockString();

    beforeEach(() => {
        global.localStorage.__proto__.getItem = jest.fn().mockResolvedValue(someMockValue);
        global.localStorage.__proto__.setItem = jest.fn();
    });

    test('set item in local storage', () => {
        const mockKey = createMockString();

        LocalStorageService.setElement(mockKey, someMockValue);

        expect(global.localStorage.__proto__.setItem).toBeCalledWith(mockKey, someMockValue);
    });

    test('get item from local storage', () => {
        const mockKey = createMockString();

        const result = LocalStorageService.getElement(mockKey);

        expect(global.localStorage.__proto__.getItem).toBeCalledWith(mockKey);
    });
})