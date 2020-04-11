# About

React Provider for [Dynadux](https://github.com/aneldev/dynadux#readme)'s stores.

This package offers

- The `<Provider>` that provides the about Application Store into the React's context _and_
- The `connect` method that injects your Application Store as `appStore` prop into any component.

With Provider, we can connect any component at any level without the need to pass the App Store reference in middle components.

`connect` offers a the `shouldComponentUpdate` callback where you can return according to the dispatched `action` and `payload` if the component should render or not.
In this way we can **block render** of the component by the dispatched `action` and/or `payload`.

_New to Dynadux? Learn it [here](https://github.com/aneldev/dynadux#readme)_

# Demo

- Clone this repo
- `yarn`
- `yarn start`

Check debugger's console which components rendered on each disparch.

From 

Demo code is under `/dev` folder.

# Usage

#### 1. Create an app store

```
import {createStore} from "dynadux";

const actions = {
  ADD_TODO: 'TD__ADD_TODO',
  REMOVE_TODO: 'TD__REMOVE_TODO',
};

const createAppStore = () => {
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

#### 2. Connect any component at any level with the appStore

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

Connection injects the App Store that is passed the `<Provider>` as the `appStore` prop.

#### 3. Provide the store in a root component

```
import {Provider} from "react-dynadux";

import {createAppStore} from "./store/createAppStore";

export class App extends React.Component {
  private readonly appStore = createAppStore();

  public render() {
    return (
      <Provider appStore={this.appStore}>
        <div className={classes.root}>
          <ToDos/>
        </div>
      </Provider>
    );
  }
}

```

In the root of the App or in a nested component we 
- create the `appStore`, calling the previous `createAppStore`
- wrap the components with the `<Provider>` with `appStore` the created `appStore`

#### 4. Block component render (optional)

The `ToDosComponent` will be rendered on each store's `dispatch`.

This is not optimal, especially if the dispatched action has nothing to do with this component.

`connect` offers and 2nd argument a small config object. Currently, only the `shouldComponentUpdate` callback is part of this config object.

We can block the render by `action` and/or `payload` like this:

```

const ToDosComponent = (props) => {
  ...
}

export const ToDos = connect(
  ToDosComponent,
  { shouldComponentUpdate: (action, payload) => action.startsWith('TD__') },
);

```

This connection makes the component to render only if the action is starting with `TD__`. _Note that this is the prefix of the actions._

You can implement your logic when the component should be rendered or not by `action` name or `payload`'s content.
  

# API

# `<Provider>`

React component with only one prop, the `appStore`.

App store can be any object. The only obligation is that it should have the `provider` property that is provided from the Dynadux's `createStore()` return.

Example

```
import {createStore} from "dynadux";

const createAppStore = () => {
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

Now the `appStore` can be used in the Provider.

```
export class App extends React.Component {
  private readonly appStore = createAppStore();

  public render() {
    return (
      <Provider appStore={this.appStore}>
        // nested components
      </Provider>
    );
  }
}
```

# `connect`

Signature

```
const connect = (
  Component: React.Component, 
  config?: {
    shouldComponentUpdate?: (action: string, payload?: any) => boolean
   }
): React.Component;

```

The 1st argument is the `Component` that we want to inject the Provider's `appStore`.

The 2nd argument is optional and is a config object. 

The `shouldComponentUpdate` is a callback that will be called on each dispatch of the appStore. 
The callback is called with two arguments, the dispatched `action` and `payload`, and the callback should always return a boolean if the component should render or not.
