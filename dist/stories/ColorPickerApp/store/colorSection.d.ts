import { ICreateStoreAPI } from "dynadux";
export interface IColorSectionState {
    color: string;
}
export declare enum EColorPickerActions {
    RESET = "CL__RESET",
    SET_COLOR = "CL__SET_COLOR"
}
export declare const createColorSection: (store: ICreateStoreAPI) => {
    state: {
        readonly color: string;
    };
    actions: {
        reset: () => void;
        setColor: (color: string) => void;
    };
};
//# sourceMappingURL=colorSection.d.ts.map