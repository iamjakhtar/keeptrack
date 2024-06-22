import { useState } from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {

  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  const handleEdit = (project: Project) => {
    setProjectBeingEdited(project);
  }

  const cancelEdit = () => {
    setProjectBeingEdited({});
  }

  return (
    <>
      <ul className="row">
        {projects.map((project: Project) => (
          <div className="cols-sm" key={project.id}>
            {project === projectBeingEdited ? (
              <ProjectForm onCancel={cancelEdit} project={project}/>
            ) : (
              <ProjectCard project={project} onEdit={handleEdit} />
            )}
          </div>
        ))}
      </ul>
    </>
  );
}
