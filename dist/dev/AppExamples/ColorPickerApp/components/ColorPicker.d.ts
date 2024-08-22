import * as React from "react";
import { IAppStoreApi } from "../store/appStore";
export interface IColorPickerProps {
    store: IAppStoreApi;
}
export declare const ColorPicker: React.ComponentType<Omit<IColorPickerProps, keyof import("../../../../src").IWithStore>>;
