import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import loggerMiddleware from './logger';
import AppInit from 'sagas/AppInit';
import rootReducer from './reducers';


export default function configureStore(preloadedState: any) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [loggerMiddleware, sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  sagaMiddleware.run(AppInit);

  return store;
}