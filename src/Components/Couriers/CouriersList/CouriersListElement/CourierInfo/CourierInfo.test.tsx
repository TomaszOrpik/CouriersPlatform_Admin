import { act } from "@testing-library/react";
import { mount, ReactWrapper } from "enzyme";
import { Courier } from "../../../../../Store/Models/Courier.model";
import { createMockCourier } from "../../../../../Store/Models/Courier.model.mock";
import CourierInfo from "./CourierInfo";


describe('CourierInfo component', () => {
    let courier: Courier;
    let wrapper: ReactWrapper;
    let textNode: string;

    test('display courier info if courier passed', () => {
        courier = createMockCourier();
        wrapper = mount(<CourierInfo courier={courier} />);

        textNode = wrapper.text();

        expect(textNode.includes(courier.employeeNumber)).toBe(true);
        expect(textNode.includes(courier.vehicle)).toBe(true);
        expect(textNode.includes(courier.registration)).toBe(true);
        expect(textNode.includes(courier.currentPackages.id)).toBe(true);
    });

    test('dont display if missing courier', () => {
        courier = createMockCourier();
        wrapper = mount(<CourierInfo courier={null} />);

        textNode = wrapper.text();

        expect(textNode.includes(courier.employeeNumber)).toBe(false);
        expect(textNode.includes(courier.vehicle)).toBe(false);
        expect(textNode.includes(courier.registration)).toBe(false);
        expect(textNode.includes(courier.currentPackages.id)).toBe(false);
    });
});
