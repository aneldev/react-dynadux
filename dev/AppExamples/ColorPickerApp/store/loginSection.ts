import { ICreateStoreAPI } from "dynadux";

export interface ILoginSectionState {
  isLoading: boolean;
  logged: boolean;
  userDisplayName: string;
}

export enum ELoginSectionActions {
  LOGIN_REQUEST = 'LG__LOGIN_REQUEST',    // ILOGIN_REQUEST_payload
  LOGIN_RESPONSE = 'LG__LOGIN_RESPONSE',
  LOG_OUT = 'LG__LOG_OUT',
  ON_LOGIN_STATE_CHANGE = 'LG__ON_LOGIN_STATE_CHANGE',
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
      [ELoginSectionActions.LOGIN_REQUEST]: ({payload, dispatch}) => {
        (async () => {
          const {loginName, psw}: ILOGIN_REQUEST_payload = payload;
          await new Promise(r => setTimeout(r, 300)); // Simulate network latency
          dispatch<ILOGIN_RESPONSE_payload>(ELoginSectionActions.LOGIN_RESPONSE, {logged: true, userDisplayName: 'John Smith'});
        })();

        return {
          isLoading: true,
        };
      },
      [ELoginSectionActions.LOGIN_RESPONSE]: ({payload, dispatch}) => {
        const {logged, userDisplayName}: ILOGIN_RESPONSE_payload = payload;
        dispatch(ELoginSectionActions.ON_LOGIN_STATE_CHANGE);
        return {
          isLoading: false,
          logged,
          userDisplayName,
        };
      },
      [ELoginSectionActions.LOG_OUT]: ({dispatch}) => {
        dispatch(ELoginSectionActions.ON_LOGIN_STATE_CHANGE);
        return {
          logged: false,
          userDisplayName: '',
        };
      },
      [ELoginSectionActions.ON_LOGIN_STATE_CHANGE]: () => ({}),
    }
  });

  return {
    get state(): ILoginSectionState {
      return section.state;
    },
    actions: {
      login: (loginName: string, psw: string): void => section.dispatch<ILOGIN_REQUEST_payload>(ELoginSectionActions.LOGIN_REQUEST, {loginName, psw}),
      logout: (): void => section.dispatch<void>(ELoginSectionActions.LOG_OUT),
    },
  };
};
