import { Position } from "../Store/Models/Position.model";

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
export const createMockString = () => (Math.random() + 1).toString(36).substring(7);
export const createMockNumber = () => Math.floor(Math.random() * 10000000);
export const createMockDateString = () => new Date('2021-12-01T12:00:00').toString();
export const createMockDate = () => new Date('2021-12-01T12:00:00');
export const createMockPosition = (): Position => {
    return {
        latitude: createMockNumber(),
        longitude: createMockNumber()
    }
}