import * as React from "react";
export interface IConnectConfig {
    shouldComponentUpdate?: (action: string, payload?: any) => boolean;
    debounce?: IDebounceConfig;
}
export interface IDebounceConfig {
    timeout: number;
}
interface IWithStore {
    store: any;
    dynaduxStore: any;
}
export declare const connect: <TProps>(Component: React.ComponentType<TProps>, config?: IConnectConfig) => React.ComponentType<Omit<TProps, keyof IWithStore>>;
export {};
