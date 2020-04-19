import * as React from "react";

export interface IProviderProps<TBusinessStore> {
  store: TBusinessStore;
  children: any;
}

export const DynaDuxContext = React.createContext(null as any);
DynaDuxContext.displayName = "DynaduxContext";

export const Provider =
  <TStoreAPI, >(props: IProviderProps<TStoreAPI>) => {
    const {
      store,
      children,
    } = props;
    return (
      <DynaDuxContext.Provider value={store}>
        {children}
      </DynaDuxContext.Provider>
    );
  };
