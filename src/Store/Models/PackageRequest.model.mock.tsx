import { createMockPosition, createMockString } from "../../Utilities/test.utilities";
import { PackageStatus } from "./Package.model";
import { PackageRequest } from "./PackageRequest.model";

export const createMockPackageRequest = (props?: PackageRequest): PackageRequest => {
    return {
        id: createMockString(),
        packageNumber: createMockString(),
        sendDate: createMockString(),
        receiver: createMockString(),
        sender: createMockString(),
        position: createMockPosition(),
        comments: createMockString(),
        status: PackageStatus.waiting,
        ...props
    }
}