import { createMockNumber, createMockPosition, createMockString } from "../../Utilities/test.utilities";
import { CourierRequest } from "./CourierRequest.model";
import { createMockRegion } from "./Region.model.mock";

export const createMockCourierRequest = (props?: CourierRequest): CourierRequest => {
    return {
        employeeNumber: createMockString(),
        firstName: createMockString(),
        lastName: createMockString(),
        password: createMockString(),
        phoneNumber: createMockNumber(),
        startPosition: createMockPosition(),
        vehicle: createMockString(),
        registration: createMockString(),
        startTime: createMockString(),
        region: createMockRegion(),
        deliveredPackages: [createMockString()],
        undeliveredPackages: [createMockString()],
        currentPackages: createMockString(),
        ...props
    }
}