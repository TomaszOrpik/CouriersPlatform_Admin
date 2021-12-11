import { createMockDate, createMockPosition, createMockString } from "../../Utilities/test.utilities";
import { Package, PackageStatus } from "./Package.model";
import { createMockUser } from "./User.model.mock";

export const createMockPackage = (props?: Package): Package => {
    return {
        id: createMockString(),
        packageNumber: createMockString(),
        sendDate: createMockDate(),
        receiver: createMockUser(),
        sender: createMockUser(),
        position: createMockPosition(),
        comments: createMockString(),
        status: PackageStatus.waiting,
        ...props
    }
}