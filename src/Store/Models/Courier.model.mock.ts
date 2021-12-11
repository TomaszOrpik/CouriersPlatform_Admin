import { createMockNumber, createMockPosition, createMockString } from "../../Utilities/test.utilities";
import { Courier } from "./Courier.model";
import { createMockPackage } from "./Package.model.mock";
import { createMockRegion } from "./Region.model.mock";

export const createMockCourier = (props?: Courier): Courier => {
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
        deliveredPackages: [createMockPackage()],
        undeliveredPackages: [createMockPackage()],
        currentPackages: createMockPackage(),
        ...props
    }
}