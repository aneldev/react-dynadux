import * as React from "react";
import { CSSProperties } from "react";

import { Provider } from "../../../src";

import { createAppStore } from "./store/appStore";
import { LoginBar } from "./components/LoginBar";
import { ColorPicker } from "./components/ColorPicker";

const styleRoot: CSSProperties = {
  width: "400px",
  margin: "auto",
};

export class App extends React.Component {
  private readonly store = createAppStore();
  private readonly appIcon = <i className="fas fa-gem"/>;

  public render(): JSX.Element {
    console.log('#### Main App Render');
    return (
      <Provider store={this.store}>
        <div style={styleRoot}>
          <LoginBar appIcon={this.appIcon}/>
          <ColorPicker/>
        </div>
      </Provider>
    );
  }
}
