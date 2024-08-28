import { ICreateStoreAPI } from "dynadux";

export interface IColorSectionState {
  color: string;
}

export enum EColorPickerActions {
  RESET = 'CL__RESET',
  SET_COLOR = 'CL__SET_COLOR',
}

export const createColorSection = (store: ICreateStoreAPI) => {
  const section = store.createSection<IColorSectionState>({
    section: 'colorSection',
    initialState: {
      color: '',
    },
    reducers: {
      [EColorPickerActions.RESET]: () => ({color: ''}),
      [EColorPickerActions.SET_COLOR]: ({payload}) => ({color: payload}),
    },
  });

  return {
    state: {
      get color(): string {
        return section.state.color;
      },
    },
    actions: {
      reset: (): void => section.dispatch<void>(EColorPickerActions.RESET),
      setColor: (color: string): void => section.dispatch<string>(EColorPickerActions.SET_COLOR, color),
    },
  };
};
