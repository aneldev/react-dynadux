import { IConnectConfig } from './connect';
/**
 * Provides a hook-based interface for subscribing to store changes from the DynaDuxContext.
 *
 * Mimics the classic "connect" HOC pattern by exposing config to filter when the component should update and to debounce store-driven re-renders.
 * Only triggers re-renders when relevant store actions occur, improving component efficiency and control.
 * Must be called from a descendant of a DynaDux Provider.
 *
 * @throws {Error} If used outside of a DynaDux Provider context.
 * @returns {{store: any, dynaduxStore: any}} - An object containing the current store from context and the raw dynaduxStore.
 *
 * @example
 * // In a React function component:
 * import { useConnectedStore } from './useConnectedStore';
 *
 * function MyComponent() {
 *   const { store, dynaduxStore } = useConnectedStore({
 *     shouldComponentUpdate: (action) => action !== 'IGNORED_ACTION',
 *     debounce: { timeout: 100 }
 *   });
 *   return <div>{store.someValue}</div>;
 * }
 */
export declare const useStoreAdvanced: <TStore>(config?: IConnectConfig) => TStore | never;
//# sourceMappingURL=useStoreAdvanced.d.ts.map