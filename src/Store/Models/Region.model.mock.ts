import { createMockString, createMockPosition } from "../../Utilities/test.utilities"
import { Region } from "./Region.model"

export const createMockRegion = (props?: Region): Region => {
    return {
        name: createMockString(),
        leftTop: createMockPosition(),
        leftBottom: createMockPosition(),
        rightTop: createMockPosition(),
        rightBottom: createMockPosition(),
        ...props
    }
}