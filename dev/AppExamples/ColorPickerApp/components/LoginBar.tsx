import * as React from "react";
import { CSSProperties } from "react";

import { connect } from "../../../../src";

import { IAppStoreApi } from "../store/appStore";

export interface ILoginBarProps {
  appStore: IAppStoreApi;
  appIcon: JSX.Element;
}

const rootStyle: CSSProperties = {
  textAlign: 'right',
  paddingBottom: '4px',
  borderBlock: '2px solid gray',
  marginBottom: '4px',
};

const buttonStyle: CSSProperties = {
  marginLeft: '8px',
};

const appIconStyle: CSSProperties = {
  float: 'left', // Nostalgia!
};

const LoginBarComponent = (props: ILoginBarProps): JSX.Element => {
  const {appIcon} = props;
  const {
    state: {
      isLoading,
      logged,
      userDisplayName,
    },
    actions: {
      login,
      logout,
    },
  } = props.appStore.login;

  console.log('#### LoginBar Render');

  const handleButtonClick = (): void => {
    logged
      ? logout()
      : login('jogn@example.com', 'marsupilami');
  };

  return (
    <div style={rootStyle}>
      <span style={appIconStyle}>{appIcon}</span>
      {logged
        ? <>Welcome {userDisplayName}</>
        : <>Good {(new Date).getHours() >= 12 ? 'afternoon' : 'morning'}</>
      }
      <button
        style={buttonStyle}
        disabled={isLoading}
        onClick={handleButtonClick}
      >
        {logged ? 'Logout' : 'Login'}
        {isLoading && ' ...'}
      </button>
    </div>
  );
};

export const LoginBar = connect(
  LoginBarComponent,
  {
    shouldComponentUpdate: (action, payload) => action.startsWith('LG__'),
  },
);
