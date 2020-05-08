import * as React from "react";
export interface IConnectConfig {
    shouldComponentUpdate?: (action: string, payload?: any) => boolean;
    debounce?: IDebounceConfig;
}
export interface IDebounceConfig {
    timeout: number;
}
export declare const connect: <TProps>(Component: React.ComponentType<TProps>, config?: IConnectConfig) => React.ComponentType<Pick<TProps, Exclude<keyof TProps, "store" | "dynaduxStore">>>;
