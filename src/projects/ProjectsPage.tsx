import { useEffect, useState } from "react";
import { Project } from "./Project";
import ProjectList from "./ProjectList";
import { projectApi } from "./projectApi";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const handleMoreClick = () => {
    setCurrentPage((prevPage) => {
      return 5 === prevPage ? 1 : prevPage + 1;
    });
  };

  useEffect(() => {
    const getProjects = async () => {
      setLoading(true);
      try {
        const data = await projectApi.get(currentPage);
        setProjects(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, [currentPage]);

  const saveProject = (project: Project) => {
    projectApi
      .put(project)
      .then(updatedProject => {
        let updatedProjects = projects.map((p: Project) => {
          return p.id === project.id ? new Project(updatedProject) : p;
        });
        setProjects(updatedProjects);
      })
      .catch(e => {
        if (e instanceof Error) {
          setError(e.message);
        }
      })
  };

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
      <ProjectList projects={projects} onSave={saveProject} />
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
