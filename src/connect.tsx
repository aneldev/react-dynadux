import * as React from "react";
import { IStoreProviderAPI } from "dynadux/dist/commonJs/createStore/createStore";
import { DynaDuxContext } from "./Provider";
import { debounce } from "./debounce";

export interface IConnectConfig {
  shouldComponentUpdate?: (action: string, payload?: any) => boolean;
  debounce?: IDebounceConfig;
}

export interface IDebounceConfig {
  timeout: number;
}

interface IWithStore {
  store: any;
}

export const connect =
  <TProps, >(
    Component: React.ComponentType<TProps>,
    config: IConnectConfig = {},
  ): React.ComponentType<Omit<TProps, keyof IWithStore>> => {
    const {
      shouldComponentUpdate,
    } = config;
    const Wrapper = class extends React.Component {
      constructor(props: any, context: any) {
        super(props, context);
        if (config.debounce) this.callForceUpdate = debounce(this.callForceUpdate, config.debounce.timeout);
      }

      private get store(): { provider?: IStoreProviderAPI<any> } {
        return this.context;
      }

      public componentWillMount(): void {
        if (!this.store.provider) console.error(
          "Dynadux connect: Your store should return the `provider` property also, where, is returned by the Dynadux's `createStore` to be able to connect it. " +
          "Just add the line `provider: store.provider,` in the return of your business store. " +
          "For more read the https://github.com/aneldev/react-dynadux#1-create-the-store"
        );
        if (!this.store.provider) return;
        this.store.provider.addChangeEventListener(this.handleStoreChange);
      }

      public componentWillUnmount(): void {
        if (!this.store.provider) return;
        this.store.provider.removeChangeEventListener(this.handleStoreChange);
      }

      private handleStoreChange = (state: any, action: any, payload: any): void => {
        const shouldUpdate = !shouldComponentUpdate || shouldComponentUpdate(action, payload);
        if (shouldUpdate) this.callForceUpdate();
      };

      private callForceUpdate = (): void => {
        this.forceUpdate();
      };

      public render(): JSX.Element {
        const C: any = Component;
        return <C store={this.context} {...this.props}/>;
      }
    };

    Wrapper.contextType = DynaDuxContext;

    return Wrapper as any;
  };
