import * as React from "react";
import {
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

import {debounce} from './utils/debounce';
import {DynaDuxContext} from './Provider';

import {IConnectConfig} from './connect';

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
export const useStoreAdvanced = <TStore,>(config: IConnectConfig = {}): TStore | never => {
  const store = useContext(DynaDuxContext);
  const [, setRerender] = useState(0);
  const isMounted = useRef(false);

  const rerender = useCallback(
    config.debounce
      ? debounce(() => setRerender(t => t + 1), config.debounce.timeout)
      : () => setRerender(t => t + 1),
    [config.debounce],
  );

  React.useEffect(() => {
    isMounted.current = true;
    const handler = (_state: any, action: any, payload: any) => {
      if (!config.shouldComponentUpdate || config.shouldComponentUpdate(action, payload)) {
        rerender();
      }
    };
    store?.provider?.addChangeEventListener(handler);
    return () => {
      isMounted.current = false;
      store?.provider?.removeChangeEventListener(handler);
    };
  }, [store, config, rerender]);

  if (!store) throw new Error("useConnectedStore must be used within DynaDux Provider");
  return store;
};
