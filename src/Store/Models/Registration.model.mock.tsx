import { createMockNumber, createMockString } from "../../Utilities/test.utilities";
import { createMockPackage } from "./Package.model.mock";
import { Registration, RegistrationStatus } from "./Registration.model";
import { createMockUser } from "./User.model.mock";

export const createMockRegistration = (props?: Registration): Registration => {
    return {
        id: createMockString(),
        package: createMockPackage(),
        date: new Date(),
        user: createMockUser(),
        subject: createMockString(),
        additionalInfo: createMockString(),
        contactPhone: createMockNumber(),
        contactMail: createMockString(),
        status: RegistrationStatus.waiting,
        ...props
    }
}