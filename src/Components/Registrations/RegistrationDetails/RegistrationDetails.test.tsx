import { ReactWrapper, mount } from "enzyme";

import { Registration } from "../../../Store/Models/Registration.model";
import { createMockRegistration } from "../../../Store/Models/Registration.model.mock";
import RegistrationDetails from "./RegistrationDetails";


describe('RegistrationDetails component', () => {
    let registration: Registration;
    let wrapper: ReactWrapper;
    let textNode: string;

    test('show registration details', () => {
        registration = createMockRegistration();
        wrapper = mount(<RegistrationDetails registration={registration} />);
        const dateConverted = `${new Date(registration.date)
            .getDay()
            .toString()
            .padStart(2, "0")}/${new Date(registration.date)
                .getMonth()
                .toString()
                .padStart(
                    2,
                    "0"
                )}/${new Date(registration.date).getFullYear()}`;
        const receiverConverted = `${registration.package.receiver.firstName} ${registration.package.receiver.lastName}`;
        const senderConverted = `${registration.package.sender.firstName} ${registration.package.sender.lastName}`;

        textNode = wrapper.text();

        expect(textNode.includes(registration.id)).toBe(true);
        expect(textNode.includes(registration.package.packageNumber)).toBe(true);
        expect(textNode.includes(dateConverted)).toBe(true);
        expect(textNode.includes(receiverConverted)).toBe(true);
        expect(textNode.includes(senderConverted)).toBe(true);
        expect(textNode.includes(registration.subject)).toBe(true);
        expect(textNode.includes(registration.additionalInfo)).toBe(true);
        expect(textNode.includes(registration.contactPhone.toString())).toBe(true);
        expect(textNode.includes(registration.contactMail)).toBe(true);
    });

    test('dont show registration if not selected', () => {
        registration = createMockRegistration();
        wrapper = mount(<RegistrationDetails registration={null} />);
        const dateConverted = `${new Date(registration.date)
            .getDay()
            .toString()
            .padStart(2, "0")}/${new Date(registration.date)
                .getMonth()
                .toString()
                .padStart(
                    2,
                    "0"
                )}/${new Date(registration.date).getFullYear()}`;
        const receiverConverted = `${registration.package.receiver.firstName} ${registration.package.receiver.lastName}`;
        const senderConverted = `${registration.package.sender.firstName} ${registration.package.sender.lastName}`;

        textNode = wrapper.text();

        expect(textNode.includes(registration.id)).toBe(false);
        expect(textNode.includes(registration.package.packageNumber)).toBe(false);
        expect(textNode.includes(dateConverted)).toBe(false);
        expect(textNode.includes(receiverConverted)).toBe(false);
        expect(textNode.includes(senderConverted)).toBe(false);
        expect(textNode.includes(registration.subject)).toBe(false);
        expect(textNode.includes(registration.additionalInfo)).toBe(false);
        expect(textNode.includes(registration.contactPhone.toString())).toBe(false);
        expect(textNode.includes(registration.contactMail)).toBe(false);
    });
});



///show if passed registration

///check for data display
//id itp

///dont show if passed null