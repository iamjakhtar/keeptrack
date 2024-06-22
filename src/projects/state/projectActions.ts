import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { projectApi } from "../projectApi";
import {
  LOAD_PROJECTS_FAILURE,
  LOAD_PROJECTS_REQUEST,
  LOAD_PROJECTS_SUCCESS,
  ProjectState,
  SAVE_PROJECT_FAILURE,
  SAVE_PROJECT_REQUEST,
  SAVE_PROJECT_SUCCESS,
} from "./projectTypes";
import { Project } from "../Project";

export function loadProjects(
  page: number
): ThunkAction<void, ProjectState, null, Action<string>> {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_PROJECTS_REQUEST });
    try {
      const data = await projectApi.get(page);
      dispatch({ type: LOAD_PROJECTS_SUCCESS, payload: {projects: data, page} });
    } catch (err) {
      dispatch({ type: LOAD_PROJECTS_FAILURE, payload: err });
    }
  };
}

export function saveProject(project: Project): ThunkAction<void, ProjectState, null, Action<string>> {
    return async (dispatch: any) => {
        dispatch({ type: SAVE_PROJECT_REQUEST });
        try {
            const data = await projectApi.put(project);
            dispatch({ type: SAVE_PROJECT_SUCCESS, payload: data });
        } catch (err) {
            dispatch({ type: SAVE_PROJECT_FAILURE, payload: err });
        }
    }
}
