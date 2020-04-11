import { ICreateStoreAPI } from "dynadux";

export interface ILoginSectionState {
  isLoading: boolean;
  logged: boolean;
  userDisplayName: string;
}

export enum ELogingSectionActions {
  LOGIN_REQUEST = 'LG__LOGIN_REQUEST',    // ILOGIN_REQUEST_payload
  LOGIN_RESPONSE = 'LG__LOGIN_RESPONSE',
  LOG_OUT = 'LG__LOG_OUT',
  LOGIN_STATE_CHANGED = 'LG__LOGIN_STATE_CHANGED',
}

export interface ILOGIN_REQUEST_payload {
  loginName: string;
  psw: string;
}

interface ILOGIN_RESPONSE_payload {
  logged: boolean;
  userDisplayName: string;
}

export const createLoginSection = (store: ICreateStoreAPI) => {
  const section = store.createSection<ILoginSectionState>({
    section: 'loginSection',
    initialState: {
      isLoading: false,
      logged: false,
      userDisplayName: '',
    },
    reducers: {
      [ELogingSectionActions.LOGIN_REQUEST]: ({payload, dispatch}) => {
        (async () => {
          const {loginName, psw}: ILOGIN_REQUEST_payload = payload;
          await new Promise(r => setTimeout(r, 300)); // Simulate network latency
          dispatch<ILOGIN_RESPONSE_payload>(ELogingSectionActions.LOGIN_RESPONSE, {logged: true, userDisplayName: 'John Smith'});
        })();

        return {
          isLoading: true,
        };
      },
      [ELogingSectionActions.LOGIN_RESPONSE]: ({payload, dispatch}) => {
        const {logged, userDisplayName}: ILOGIN_RESPONSE_payload = payload;
        dispatch(ELogingSectionActions.LOGIN_STATE_CHANGED);
        return {
          isLoading: false,
          logged,
          userDisplayName,
        };
      },
      [ELogingSectionActions.LOG_OUT]: ({dispatch}) => {
        dispatch(ELogingSectionActions.LOGIN_STATE_CHANGED);
        return {
          logged: false,
          userDisplayName: '',
        };
      },
    }
  });

  return {
    get state(): ILoginSectionState {
      return section.state;
    },
    actions: {
      login: (loginName: string, psw: string): void => section.dispatch<ILOGIN_REQUEST_payload>(ELogingSectionActions.LOGIN_REQUEST, {loginName, psw}),
      logout: (): void => section.dispatch<void>(ELogingSectionActions.LOG_OUT),
    },
  };
};
