import { CONSTANTS } from "./constants";
import { createMockDate, createMockDateString, createMockNumber, createMockPosition, createMockString, delay } from "./test.utilities";

describe('utilities', () => {

    describe('constants', () => {
        test('get api endpoint', () => {
            const result = CONSTANTS.API_ENDPOINT;
            expect(result).toBeDefined();
        });

        test('get map endpoint', () => {
            const result = CONSTANTS.MAP_ENDPOINT;
            expect(result).toBeDefined();
        });
    });

    describe('test utilities', () => {

        test('delay function', async () => {
            let seconds = 0;
            const intervalId = setInterval(() => {
                seconds = seconds + 1;
            }, 1000);
            await delay(2100);
            clearInterval(intervalId);

            expect(seconds).toEqual(2);
        });

        test('create mock string function', () => {
            const mockString = createMockString();

            expect(mockString).toBeDefined();
        });

        test('create mock number function', () => {
            const mockNumber = createMockNumber();

            expect(mockNumber).toBeDefined();
        });

        test('create mock date string function', () => {
            const mockDateString = createMockDateString();

            expect(mockDateString).toBeDefined();
        });

        test('create mock date function', () => {
            const mockDate = createMockDate();

            expect(mockDate).toBeDefined();
        });

        test('create mock position function', () => {
            const mockPosition = createMockPosition();

            expect(mockPosition).toBeDefined();
        });
    });
});