import * as React from "react";
export interface IConnectConfig {
    shouldComponentUpdate?: (action: string, payload?: any) => boolean;
}
export declare const connect: <TProps>(Component: React.ComponentType<TProps>, config?: IConnectConfig) => React.ComponentType<Pick<TProps, Exclude<keyof TProps, "appStore">>>;
