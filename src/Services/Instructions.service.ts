import Driver from "driver.js";
import 'driver.js/dist/driver.min.css';
import Cookies from "universal-cookie";

export class InstructionsService {

    static execute(page: string, padding: number, steps: InstructionModel[]) {
        const driver = new Driver({
            padding: padding,
        });
        const cookies = new Cookies();

        let pages: string[] = [];
        const cookie: string[] = cookies.get('pages');
        if (cookie) {
            pages = cookie;
        };

        if (pages.includes(page)) return;
        else {
            driver.defineSteps(steps.map((step) => {
                return new InstructionElement(step);
            }));
            driver.start();
            pages.push(page);
            console.log('reached');
            cookies.set('pages', JSON.stringify(pages), { path: "/" });
        }
    }
}

export interface InstructionModel {
    element: string;
    title: string;
    description: string;
    position: 'top' | 'bottom' | 'left' | 'right';
}

export class InstructionElement {
    element: string;
    stageBackground = '#ffffff';
    popover: {
        className: string;
        title: string;
        description: string;
        position: string;
        doneBtnText: string;
        closeBtnText: string;
        nextBtnText: string;
        prevBtnText: string;
    };

    constructor(props: InstructionModel) {
        this.element = props.element;
        this.popover = {
            className: "instruction-popover",
            title: props.title,
            description: props.description,
            position: props.position,
            doneBtnText: 'Gotowe',
            closeBtnText: 'Zamknij',
            nextBtnText: 'Dalej',
            prevBtnText: 'Cofnij'

        }
    }

}
