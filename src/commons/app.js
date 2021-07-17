import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import commonReducer from '@/commons/reducer';

/*
  getDefaultMiddleware() enable following middlewares:
  -------------
  1. immutable-state-invariant (only in development build)
  2. redux-immutable-state-invariant (only in development build)
  3. serializable-state-invariant-middleware (only in development build)
  4. redux-thunk
*/
const middleware = getDefaultMiddleware();

// redux logger
if (process.env.COMPILE_ENV === 'dev') {
  middleware.push(logger);
}

class App {
  init() {
    // ==== init history ==== //
    const appHistory = (this.history = createBrowserHistory({
      basename: '', // The base URL of the app
      // forceRefresh: false, // Set true to force full page refreshes
      // keyLength: 6, // The length of location.key
      // A function to use to confirm navigation with the user (see below)
      // getUserConfirmation: (message, callback) => callback(window.confirm(message)),
    }));

    // hash history
    // const appHistory = this.history = createHashHistory({
    //     basename: '',
    // })

    middleware.push(routerMiddleware(appHistory));

    this.reducerMap = {
      router: connectRouter(appHistory),
      commons: commonReducer,
    };

    // configureStore() will Enabling the Redux DevTools Extension automatically
    this.store = configureStore({
      middleware,
      reducer: combineReducers(this.reducerMap),
    });
  }

  /**
   *  动态添加新的 reducer
   */
  addReducer(namespace, reducer) {
    console.info(`sfe-page-connect:: 注册 reducer ${namespace}`);

    if (this.reducerMap[namespace] != null) {
      console.error(`sfe-page-connect:: 重复注册 reducer, reducer '${namespace}' already exist`);
    }

    const newReducerMap = {
      ...this.reducerMap,
      [namespace]: reducer,
    };
    // 动态替换 reducer
    this.store.replaceReducer(combineReducers(newReducerMap));
    this.reducerMap = newReducerMap;
  }
}

export default new App();
