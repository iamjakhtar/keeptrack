import { Project } from "../Project";
import { DELETE_PROJECT_FAILURE, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, LOAD_PROJECTS_FAILURE, LOAD_PROJECTS_REQUEST, LOAD_PROJECTS_SUCCESS, ProjectActionTypes, ProjectState, SAVE_PROJECT_FAILURE, SAVE_PROJECT_REQUEST, SAVE_PROJECT_SUCCESS } from "./projectTypes";


export const initialProjectState: ProjectState = {
    loading: false,
    projects: [],
    error: '',
    page: 1
};

export const projectReducer = (state = initialProjectState, action: ProjectActionTypes ) => {
   
    switch(action.type) {
        case LOAD_PROJECTS_REQUEST:
            return {...state, loading: true, error: ''};
        case LOAD_PROJECTS_SUCCESS:
            let projects: Project[];
            const { page } = action.payload;
            if (page === 1) {
                projects = action.payload.projects;
            } else {
                projects = [...state.projects, ...action.payload.projects];
            }
            return {
                ...state,
                loading: false,
                projects,
                error: '', 
                page
            }
        case LOAD_PROJECTS_FAILURE:
            return { ...state, loading: false, error: action.payload.message };
        case SAVE_PROJECT_REQUEST:
            return {...state};
        case SAVE_PROJECT_SUCCESS:
            if (action.payload.isNew) {
                return {
                    ...state,
                    projects : [...state.projects, action.payload]
                }
            } else {
                return {
                    ...state,
                    projects: state.projects.map((project: Project) => {
                        return project.id === action.payload.id 
                        ? Object.assign({}, project, action.payload)
                        : project;
                    })
                }
            }
        case SAVE_PROJECT_FAILURE:
            return {...state, loading: false, error: action.payload };
        
        case DELETE_PROJECT_REQUEST:
            return { ...state };
        case DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                projects: state.projects.filter((project: Project) => {
                    return project.id !== action.payload.id
                })
            }
        case DELETE_PROJECT_FAILURE:
            return {...state, loading: false, error: action.payload };
        default:
            return state;
    }
}