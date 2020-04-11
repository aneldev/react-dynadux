import * as React from "react";
import { IStoreProviderAPI } from "dynadux/dist/commonJs/createStore/createStore";
import { DynaDuxContext } from "./Provider";

export interface IConnectConfig {
  shouldComponentUpdate?: (action: string, payload?: any) => boolean;
}

interface IWithStore {
  appStore: any;
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
      private get store(): { provider?: IStoreProviderAPI<any> } {
        return this.context;
      }

      public componentWillMount(): void {
        if (!this.store.provider) console.error(
          "Dynadux connect: Your app store should return the `provider` property also where is returned by the Dynadux's `createStore` is order to be able to connect it. " +
          "Just add the line `provide: store.provider,` in the return of your appStore. " +
          // Todo: Update the readme link
          "For more read the https://github.com/aneldev/react-dynadux#1-create-an-app-store"
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
        if (shouldUpdate) this.forceUpdate();
      };

      public render(): JSX.Element {
        const C: any = Component;
        return <C appStore={this.context} {...this.props}/>;
      }
    };

    Wrapper.contextType = DynaDuxContext;

    return Wrapper as any;
  };
