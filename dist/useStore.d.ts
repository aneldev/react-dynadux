/**
 * Access the current store instance from the Provider context.
 *
 * Should only be called from a descendant of the Provider.
 *
 * @template TStore The type of the store provided by the context.
 * @throws {Error} If used outside of a Provider.
 * @returns {TStore} The store instance from the Provider.
 *
 * @example
 * // In a React component
 * import { useStore } from "./useStore";
 * import type { MyStoreType } from "./store";
 *
 * function MyComponent() {
 *   const store = useStore<MyStoreType>();
 *   return <div>{store.someValue}</div>;
 * }
 */
export declare const useStore: <TStore>() => TStore | never;
//# sourceMappingURL=useStore.d.ts.map