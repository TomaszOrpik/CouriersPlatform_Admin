import { createMockNumber, createMockString } from "../../Utilities/test.utilities";
import { RegistrationStatus } from "./Registration.model";
import { RegistrationRequest } from "./RegistrationRequest.model";

export const createMockRegistrationRequest = (props?: RegistrationRequest): RegistrationRequest => {
    return {
        id: createMockString(),
        packageId: createMockString(),
        date: createMockString(),
        user: createMockString(),
        subject: createMockString(),
        additionaInfo: createMockString(),
        contactPhone: createMockNumber(),
        contactMail: createMockString(),
        status: RegistrationStatus.waiting,
        ...props
    }
}