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

# `<Provider>` component

React component with only one prop, the `store`.

App store can be any object. The only obligation is that it should have the `provider` property that is provided from the Dynadux's `createStore()` return.

Example

```
import {createStore} from "dynadux";

const createStore = () => {
  const store = createStore({
    initialState: {...},
    reducers: {...},
  });

  return {
    // Your getters, setters, methods
    ...        
    // Important, pass the provider prop of the createStore above
    provider: store.provider,
  };
};
```

Now let's create an `store` and pass it to the Provider.

```
export class App extends React.Component {
  private readonly store = createStore();

  public render() {
    return (
      <Provider store={this.store}>
        // nested components
      </Provider>
    );
  }
}
```

# `connect` method

## What is doing

Use `connect` to connect any component with the closer `<Provider>`.

The `connect` will inject two properties in the props of the component:
- `store` is the store that you passed with the `<Provider>` _and_
- `dynaduxStore` is the store created by the `createStore` method

The `store` is your Business Store where encapsulates the dynadux store.

The `dynaduxStore` is the return of the `createStore`, and it has the `state` getter and the `dispatch` method.

With `dynaduxStore` you can dispatch an action. It is not recommended to dispatch actions, but this is needed when you create 3rd party libraries.

## Signature

```
const connect = (
  Component: React.Component, 
  config?: {
    shouldComponentUpdate?: (action: string, payload?: any) => boolean;
    debounce?: {timeout: number};
   }
): React.Component;

```

The 1st argument is the `Component` that we want to inject the Provider's `store`.

The 2nd argument is optional and is a config object with below optional properties:

#### `shouldComponentUpdate`
Is a callback that is called on each dispatch of the `store`. 

The callback is called with two arguments, the dispatched `action` and `payload`, and the callback should always return a boolean if the component should render or not.

#### `debounce`
Is config object of one property, the `timeout`.

The debounce config blocks changes (renders) within the timeout and applies the latest on the timeout's expiration.

# Change log

## 2.0.0

First version. React 16.

## 3.0.0

React 17.
