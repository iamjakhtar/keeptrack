import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../state";
import ProjectList from "./ProjectList";
import { loadProjects } from "./state/projectActions";
import { ProjectState } from "./state/projectTypes";


const ProjectsPage = () => {

  const {
    page,
    projects,
    loading,
    error,
  } = useSelector((appState: AppState) => appState.projectState);

  const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();

  const handleMoreClick = () => {
    const nextPage = 5 === page ? 1 : page + 1;
    dispatch(loadProjects(nextPage));
  };

  useEffect(() => {
    dispatch(loadProjects(1));
  }, [dispatch]);

  return (
    <>
      <h1 className="center-heading">Projects</h1>
      {error && (
        <div className="row center-page">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}
      <ProjectList projects={projects} />
      {!loading && !error && (
        <div className="row projects-center">
          <div className="col-md-4 col-md-offset-4">
            <div className="button-group fluid">
              <button className="button primary" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
};
export default ProjectsPage;
