import { useEffect, useState } from "react";
import { Project } from "./Project";
import { useParams } from "react-router-dom";
import { projectApi } from "./projectApi";
import ProjectDetail from "./ProjectDetail";

const ProjectPage = () => {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    const getById = async (projectId: number) => {
      setLoading(true);
      try {
        const res = await projectApi.find(projectId);
        setProject(res);
      } catch (error: any) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getById(id);
  }, [id]);
  return (
    <div>
      <>
        <h1>Project Detail</h1>

        {loading && (
          <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="row">
            <div className="card large error">
              <section>
                <p>
                  <>
                    <span className="icon-alert inverse "></span>
                    {error}
                  </>
                </p>
              </section>
            </div>
          </div>
        )}

        {project && <ProjectDetail project={project} />}
      </>
    </div>
  );
};
export default ProjectPage;
