import { Project } from "./Project";

interface ProjectDetailProps {
    project: Project
}
const ProjectDetail = ({ project }: ProjectDetailProps) => {
    // const { id } = useParams();
    

    // useEffect(() => {
    //     const getProjectById = async(projectId: number) => {
    //         try {
    //             const res = await projectApi.find(projectId);
    //             setProject(res);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     id && getProjectById(+id);
    // }, [id]);
  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="card large">
          <img className="rounded" src={project.imageUrl} alt={project.name} />
          <section className="section dark">
            <h3 className="strong">
              <strong>{project.name}</strong>
            </h3>
            <p>{project.description}</p>
            <p>Budget : {project.budget}</p>

            <p>Signed: {project.contractSignedOn.toLocaleDateString()}</p>
            <p>
              <mark className="active">
                {" "}
                {project.isActive ? "active" : "inactive"}
              </mark>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
export default ProjectDetail