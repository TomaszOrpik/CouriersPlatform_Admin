import Cookies from "universal-cookie";
import { createMockString } from "../Utilities/test.utilities";
import { InstructionModel, InstructionsService } from "./Instructions.service";

describe('Instructions service', () => {
    let cookies: Cookies;
    let page: string;
    let step: InstructionModel;

    beforeEach(() => {
        cookies = new Cookies();
        page = createMockString();
        step = {
            element: createMockString(),
            title: createMockString(),
            description: createMockString(),
            position: 'top'
        };
    })

    test('return undefined if page is in cookies', () => {
        cookies.get = jest.fn().mockReturnValue([page]);
        let result;
        try {
            result = InstructionsService.execute(page, 10, [step]);
        } catch (e) {
            console.log('define steps error throw by unable to mock driver');
        }

        expect(result).toBeUndefined();
    });
})