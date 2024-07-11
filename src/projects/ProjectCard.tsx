import { Link } from "react-router-dom";
import { Project } from "./Project";


export function formatDescription(descrption: string, length: number): string {
  return descrption.substring(0, length) + '...';
}

interface ProjectcardProps {
    project: Project;
    onEdit: (project: Project) => void
}

export default function ProjectCard({ project, onEdit }: ProjectcardProps) {
  const handleEditClick = (projectToEdit: Project) => onEdit(projectToEdit);
  return (
    <div className="card">
      <img src={project.imageUrl} alt={project.name} />
      <section className="section dark">
        <Link to={`/projects/${project.id}`}>
          <h5 className="strong">
            <strong>{project.name}</strong>
          </h5>
          <p>{formatDescription(project.description, 60)}</p>
          <p>Budget : {project.budget.toLocaleString()}</p>
        </Link>
        <button 
          className="bordered" 
          onClick={() => handleEditClick(project)}
          aria-label={`edit ${project.name}`}
        >
          <span className="icon-edit"></span>
          Edit
        </button>
      </section>
    </div>
  );
}