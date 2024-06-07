import { Project } from "./Project";

interface ProjectcardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectcardProps) {
  const handleEditClick = (project: Project) => console.log(project);
  return (
    <div className="card">
      <img src={project.imageUrl} alt="project name" />
      <section className="section dark">
        <h5 className="strong">
          <strong>{project.name}</strong>
        </h5>
        <p>{project.description}</p>
        <p>Budget : {project.budget.toLocaleString()}</p>
        <button 
        className="bordered"
        onClick={() => handleEditClick(project)}
        >
            <span className="icon-edit"></span>
            Edit
        </button>
      </section>
    </div>
  );
}