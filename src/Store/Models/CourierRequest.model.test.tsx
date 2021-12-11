import { createMockNumber, createMockPosition, createMockString } from "../../Utilities/test.utilities";
import { CourierRequest } from "./CourierRequest.model";
import { createMockRegion } from "./Region.model.mock";

describe('CourierRequest model', () => {
    test('create request model', () => {
        const employeeNumber = createMockString();
        const firstName = createMockString();
        const lastName = createMockString();
        const password = createMockString();
        const phoneNumber = createMockNumber();
        const startPosition = createMockPosition();
        const vehicle = createMockString();
        const registration = createMockString();
        const startTime = createMockString();
        const region = createMockRegion();
        const deliveredPackages = [createMockString()];
        const undeliveredPackages = [createMockString()];
        const currentPackages = createMockString();
        const requestModel = new CourierRequest(
            employeeNumber,
            firstName,
            lastName,
            password,
            phoneNumber,
            startPosition,
            vehicle,
            registration,
            startTime,
            region,
            deliveredPackages,
            undeliveredPackages,
            currentPackages
        );

        expect(requestModel).toEqual({
            employeeNumber,
            firstName,
            lastName,
            password,
            phoneNumber,
            startPosition,
            vehicle,
            registration,
            startTime,
            region,
            deliveredPackages,
            undeliveredPackages,
            currentPackages
        })
    });
});