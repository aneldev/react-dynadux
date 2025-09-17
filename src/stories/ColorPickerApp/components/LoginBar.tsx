import {CSSProperties} from "react";

import {useStoreAdvanced} from "../../../index";

import {IAppStoreApi} from "../store/appStore";

export interface ILoginBarProps {
  appIcon: JSX.Element;
}

const rootStyle: CSSProperties = {
  textAlign: 'right',
  paddingBottom: '4px',
  borderBlock: '2px solid gray',
  marginBottom: '4px',
};

const buttonStyle: CSSProperties = {marginLeft: '8px'};

const appIconStyle: CSSProperties = {float: 'left'}; // This is Nostalgia!

export const LoginBar = (props: ILoginBarProps): JSX.Element => {
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
  } = useStoreAdvanced<IAppStoreApi>({shouldComponentUpdate: (action) => action.startsWith('LG__')}).login;

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
        : <>Good {(new Date()).getHours() >= 12 ? 'afternoon' : 'morning'}</>
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
