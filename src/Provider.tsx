import * as React from "react";

export interface IProviderProps<TStoreAPI> {
  appStore: TStoreAPI;
  children: any;
}

export const DynaDuxContext = React.createContext(null as any);
DynaDuxContext.displayName = "DynaduxContext";

export const Provider =
  <TStoreAPI, >(props: IProviderProps<TStoreAPI>) => {
    const {
      appStore,
      children,
    } = props;
    return (
      <DynaDuxContext.Provider value={appStore}>
        {children}
      </DynaDuxContext.Provider>
    );
  };
