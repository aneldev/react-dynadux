# React Dynadux

React Provider for [Dynadux](https://github.com/aneldev/dynadux#readme)'s stores.

This package offers

- The `<Provider>` that provides the about Application Store into the React's context _and_
- The `connect` method that injects your Application Store as `store` prop into any component.

With Provider, we can connect any component at any level without the need to pass the App Store reference in middle components.

`connect` offers the `shouldComponentUpdate` callback where you can return according to the dispatched `action` and `payload` if the component should render or not.
In this way, we can **block render** of the component by the dispatched `action` and/or `payload`.

It also provides the `debounce.timeout` to debounce intensive renderings.

_New to Dynadux? Learn it [here](https://github.com/aneldev/dynadux#readme)_

[![Live Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-dynadux-debounce-example-rzp8r?fontsize=14&hidenavigation=1&theme=dark)

# Usage

#### 1. Create the store

```
import {createStore} from "dynadux";

const actions = {
  ADD_TODO: 'TD__ADD_TODO',
  REMOVE_TODO: 'TD__REMOVE_TODO',
};

const createStore = () => {
    const store = createStore({
        initialState: {
            todos: [],
        },
        reducers: {
              [actions.ADD_TODO]: ({state: {todos}, payload}) => {
                return {
                  todos: todos.concat(payload),
                };
              },
              [actions.REMOVE_TODO]: ({state: {todos}, payload: todoId}) => {
                return {
                  todos: todos.filter(todo => todo.id !== todoId),
                };
              },
        },
    });

    return {
        get state() { return store.state; },
        
        addTodo: (todo) => store.dispatch(actions.ADD_TODO, todo),
        removeTodo: (todoId) => store.dispatch(actions.REMOVE_TODO, todoId),
        
        provider: store.provider,
    };
};
```

**Notice** that in the return of the store, we also return the `provider` property where is returned by Dynadux's `createStore`. 

#### 2. Connect any component at any level with the store

```
import {connect} from "react-dynadux";

const ToDosComponent = (props) => {
  const {
    todos,
  } = props.store;

  render() {
    return ...
  }
}

export const ToDos = connect(ToDosComponent);

```

The exported `ToDos` is a HOC version of the `ToDosComponent`.

Connection injects the App Store that is passed the `<Provider>` as the `store` prop.

> Tip: Here also we have and the `this.props.dynaduxStore` that offers the `state` getter and the `dispatch` method. 
> It is not recommended to `dispatch` from components (since we have sophisticated Business Stores), but it is needed when you create 3rd party Components that using the store. 

#### 3. Provide the store in a root component

```
import {Provider} from "react-dynadux";

import {createStore} from "./store/createStore";

export class App extends React.Component {
  private readonly store = createStore();

  public render() {
    return (
      <Provider store={this.store}>
        <div className={classes.root}>
          <ToDos/>
        </div>
      </Provider>
    );
  }
}

```

In the root of the App or in a nested component we 
- create the `store`, calling the previous `createStore`
- wrap the components with the `<Provider>` passing the store

# Optimization

Both `debounce` and `shouldComponentUpdate` would be used together.

## Debounce renders

We can optimize the connected component debouncing the intensive renders.

```
const ToDosComponent = (props) => {...}

export const ToDos = connect(
  ToDosComponent,
  { debouce: { timeout: 60 } },
);

```

[![debounce Live Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-dynadux-debounce-example-jxdy4?fontsize=14&hidenavigation=1&theme=dark)

This connection makes the component to be rendered every 60ms on intensive changes. The component always renders on the leading edge of the timeout and on the timeout's expiration.

## Block component renders by action/payload

We can block the render by `action` and/or `payload` like this:

```
const ToDosComponent = (props) => {...}

export const ToDos = connect(
  ToDosComponent,
  {shouldComponentUpdate: (action, payload) => action.startsWith('TD__')},
);

```

This connection makes the component to render only if the action is starting with `TD__`. _Note that this is the prefix of the actions._

You can implement your logic when the component should be rendered or not by `action` name or `payload`'s content.
  
[![shoundComponentUpdate Live Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-dynadux-debounce-example-rzp8r?fontsize=14&hidenavigation=1&theme=dark)

# Smaller Stores and Provider

The `<Provider>` can work with any store/model/business stores. The only obligation is that you have to pass the `provider` property of `createStore` of Dynadux.

That means that we can create smaller stores by merely creating a small object that has the `provider` property. 

We don't have to use anything from Dynadux. Just create a Business Store (like a business model and logic) with getters/setters and methods that are using the resources of another Store and add the `provider` of Dynadux.

Then pass this new store in the `<Provider>`. 

Checkout this example:

[![Edit React Dynadux example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-dynadux-example-6cy90?fontsize=14&hidenavigation=1&theme=dark) 

- Here in the constructor of the App, we create the `loginStore`. This creation would be done at any level of the application.

- The pass the new smaller store to the `<Provider>` of the components that expect this store.

# API

# react-dynadux exports — how to use them

This package exposes a very small API that helps you wire your own business store into React components.

Exports:
- `Provider`, `DynaDuxContext`, `IProviderProps`
- `connect`, `IConnectConfig`, `IWithStore`
- `useStore`
- `useStoreAdvanced`

Below you will find what each export does, when to use it, and concise examples.


## Provider
Wraps your application (or a subtree) and provides your business store to descendants via context.

Signature:
- Provider<TStore>(props: { store: TStore; children: ReactNode })

Example:
```tsx
import React from 'react';
import { Provider } from 'react-dynadux';
import { createStore } from './store'; // your business store factory

export function App() {
  const store = React.useMemo(() => createStore(), []);
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}
```

Notes:
- Your business store must include a provider field from Dynadux's createStore under the hood (i.e., `provider: store.provider`). See README for the full pattern.


## connect
A Higher-Order Component that injects two props into the wrapped component:
- store — your business store object you passed to `Provider`
- dynaduxStore — the raw Dynadux store (exposes low-level state/dispatch); useful for libraries and advanced cases

Optional config lets you control when the component re-renders and optionally debounce updates.

Signature:
```
connect(Component, config?) -> WrappedComponent
- config.shouldComponentUpdate: (action: string, payload?: any) => boolean
- config.debounce: { timeout: number }
- Injected props: { store, dynaduxStore }
```

Examples:
- Class component
```tsx
import React from 'react';
import { connect } from 'react-dynadux';

type ViewProps = {
  // your own props
};

type Injected = {
  store: any;
  dynaduxStore: any;
};

class View extends React.Component<ViewProps & Injected> {
  render() {
    const { store } = this.props;
    return <div>Color: {store.state.ui.color}</div>;
  }
}

export default connect(View, {
  shouldComponentUpdate: (action) => action !== 'IGNORED_ACTION',
  debounce: { timeout: 50 },
});
```

- Function component via connect
```tsx
import React from 'react';
import { connect } from 'react-dynadux';

function View({ store }: { store: any; dynaduxStore: any }) {
  return <div>User: {store.state.user?.name}</div>;
}

export default connect(View);
```

Notes:
- For most function components you’ll prefer the hooks below instead of `connect`. Keep `connect` for class components or when you need fine-grained, action-based render control without hooks.


## useStore
A minimal hook to read the current store instance from context. It returns exactly what you passed to `Provider`.

Signature:
- const store = useStore<TStore>()

Example:
```tsx
import React from 'react';
import { useStore } from 'react-dynadux';
import type { AppStore } from '../store/types';

export function Header() {
  const store = useStore<AppStore>();
  return <span>{store.state.appTitle}</span>;
}
```

Pitfalls:
- Must be used under a `Provider`; otherwise it throws an Error.


## useStoreAdvanced
A hook alternative to `connect` that lets you control re-renders based on dispatched actions and add debounce.

It subscribes to the underlying Dynadux provider and triggers a component re-render only when your filter allows it.

Signature:
```
const store = useStoreAdvanced(config)
- config.shouldComponentUpdate: (action: string, payload?: any) => boolean
- config.debounce: { timeout: number }
```

Example:
```tsx
import React from 'react';
import { useStoreAdvanced } from 'react-dynadux';
import type { AppStore } from '../store/types';

export function OptimizedPanel() {
  const store = useStoreAdvanced<AppStore>({
    shouldComponentUpdate: (action) => action === 'USER_UPDATED' || action === 'THEME_CHANGED',
    debounce: { timeout: 75 },
  });
  return <div>{store.state.user?.name}</div>;
}
```

Notes:
- Like `useStore`, this must be used under a `Provider` or it throws.
- Unlike `connect`, this hook returns only your business store (not the raw `dynaduxStore`). If you need low-level access, prefer `connect` or expose specific helpers on your business store instead.


## Types
- `IProviderProps<TStore>` — props for Provider
- `IConnectConfig` — config for connect and useStoreAdvanced
- `IWithStore` — helper interface describing the injected props of connect


## Choosing between APIs
- Function components, no special filtering: `useStore`
- Function components that must re-render only on certain actions or need debouncing: `useStoreAdvanced`
- Class components or when you need `dynaduxStore` access: `connect`


## Troubleshooting
- Got an error "useStore must be used within a dynadux Provider" or "useConnectedStore must be used within DynaDux Provider"? Wrap your component subtree with `Provider` and make sure you pass your business store into it.
- `connect` warns that your store should expose provider? Ensure your business store returns `provider: store.provider` from Dynadux's createStore.

# Change log

## 2.0.0

- First version. React 16.

## 3.0.0

- React 17.

## 4.0.0

- React 18.

## 4.1.0

- `useStore` hook
- `useStoreAdvanced` hook
- boilerplate update, upgrade dep dev versions

## 5.x

- If needed, use `dynadux` v3.x [see breaking changes](https://github.com/aneldev/dynadux/blob/master/doc/Change-Log.md#v3x)