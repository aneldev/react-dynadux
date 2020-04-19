import * as React from "react";
export interface IProviderProps<TBusinessStore> {
    store: TBusinessStore;
    children: any;
}
export declare const DynaDuxContext: React.Context<any>;
export declare const Provider: <TStoreAPI>(props: IProviderProps<TStoreAPI>) => JSX.Element;
