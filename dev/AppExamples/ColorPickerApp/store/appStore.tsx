import {
  createStore,
  dynaduxDebugMiddleware
} from "dynadux";

import {
  createLoginSection,
  ELoginSectionActions,
} from "./loginSection";

import {
  createColorSection,
} from "./colorSection";

export interface IAppStoreApi extends ReturnType<typeof createAppStore> {
}

export const createAppStore = () => {
  const store = createStore({
    middlewares: [
      dynaduxDebugMiddleware({debuggerStoreName: 'debug_store'}),
    ],
    onChange: (state, action, payload) => {
      // On Logout, reset the color.
      if (action === ELoginSectionActions.LOG_OUT) appStore.color.actions.reset();
    },
  });

  const appStore = {
    login: createLoginSection(store),
    color: createColorSection(store),
    provider: store.provider,
  };

  return appStore;
};
