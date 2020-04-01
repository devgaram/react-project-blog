import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import monitorReducerEnhancer from "enhancers/monitorReducer";
import loggerMiddleware from "middleware/logger";
import rootReducer from "store";
import rootSaga from "sagas";

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [loggerMiddleware, sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducerEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  const store = createStore(rootReducer, composedEnhancers);

  sagaMiddleware.run(rootSaga);

  return store;
}
