import { createMockNumber, createMockString } from "../../Utilities/test.utilities";
import { User } from "./User.model";

export const createMockUser = (props?: User): User => {
    return {
        id: createMockString(),
        phoneNumber: createMockNumber(),
        password: createMockString(),
        firstName: createMockString(),
        lastName: createMockString(),
        street: createMockString(),
        postCode: createMockString(),
        city: createMockString(),
        ...props
    }
}