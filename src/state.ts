import { combineReducers, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({});

export default function configureStore(preLoadedState: any) {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancer = composeWithDevTools(middlewareEnhancer);

  const state = createStore(reducer, preLoadedState, enhancer);
  return state;
}

export interface AppState {}

export const initialState: AppState = {};

export const store = configureStore(initialState);
