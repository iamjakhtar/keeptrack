import { ProjectState } from './projects/state/projectTypes';
import { combineReducers, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { initialProjectState, projectReducer } from './projects/state/projectReducer';

const reducer = combineReducers({
  projectState: projectReducer
});

export default function configureStore(preLoadedState: any) {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancer = composeWithDevTools(middlewareEnhancer);

  const state = createStore(reducer, preLoadedState, enhancer);
  return state;
}

export interface AppState {
  projectState: ProjectState
}

export const initialState: AppState = {
  projectState: initialProjectState
};

export const store = configureStore(initialState);
