import { ICreateStoreAPI } from "dynadux";
export interface ILoginSectionState {
    isLoading: boolean;
    logged: boolean;
    userDisplayName: string;
}
export declare enum ELoginSectionActions {
    LOGIN_REQUEST = "LG__LOGIN_REQUEST",// ILOGIN_REQUEST_payload
    LOGIN_RESPONSE = "LG__LOGIN_RESPONSE",
    LOG_OUT = "LG__LOG_OUT",
    ON_LOGIN_STATE_CHANGE = "LG__ON_LOGIN_STATE_CHANGE"
}
export interface ILOGIN_REQUEST_payload {
    loginName: string;
    psw: string;
}
export declare const createLoginSection: (store: ICreateStoreAPI) => {
    readonly state: ILoginSectionState;
    actions: {
        login: (loginName: string, psw: string) => void;
        logout: () => void;
    };
};
//# sourceMappingURL=loginSection.d.ts.map