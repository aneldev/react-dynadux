import * as React from "react";
import { connect } from "../../../../src";
import { IAppStoreApi } from "../store/appStore";
import { ELoginSectionActions } from "../store/loginSection";

export interface IColorPickerProps {
  store: IAppStoreApi;
}

class ColorPickerComponent extends React.Component<IColorPickerProps> {
  private handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const {store: {color: {actions: {setColor}}}} = this.props;
    setColor(event.target.value);
  };

  public render(): JSX.Element | null {
    const {
      store: {
        login: {
          state: {logged},
        },
        color: {
          state: {color},
          actions: {reset},
        },
      },
    } = this.props;

    console.log('#### ColorPicker Render');

    if (!logged) return null;

    return (
      <div>
        <label style={{marginRight: '8px'}}>Color</label>
        <select
          value={color}
          onChange={this.handleChange}
        >
          <option value="">Pick...</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </select>
        <button onClick={reset}>Reset</button>
      </div>
    );
  }
}

export const ColorPicker = connect(
  ColorPickerComponent,
  {
    shouldComponentUpdate: (action, payload) =>
      action.startsWith('CL__')
      || action === ELoginSectionActions.ON_LOGIN_STATE_CHANGE
  },
);
