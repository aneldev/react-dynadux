import * as React from "react";
import { IAppStoreApi } from "../store/appStore";
export interface ILoginBarProps {
    store: IAppStoreApi;
    appIcon: JSX.Element;
}
export declare const LoginBar: React.ComponentType<Omit<ILoginBarProps, keyof import("../../../../src").IWithStore>>;
