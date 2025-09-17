export interface IAppStoreApi extends ReturnType<typeof createAppStore> {
}
export declare const createAppStore: () => {
    login: {
        readonly state: import("./loginSection").ILoginSectionState;
        actions: {
            login: (loginName: string, psw: string) => void;
            logout: () => void;
        };
    };
    color: {
        state: {
            readonly color: string;
        };
        actions: {
            reset: () => void;
            setColor: (color: string) => void;
        };
    };
    provider: import("dynadux/dist/commonJs/create/createStore").IStoreProviderAPI<any>;
};
//# sourceMappingURL=appStore.d.ts.map