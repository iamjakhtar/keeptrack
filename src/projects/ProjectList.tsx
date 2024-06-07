import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import ProjecthtmlForm from "./ProjectForm";

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <>
      <ul className="row">
        {projects.map((project: Project) => (
          <div className="cols-sm" key={project.id}>
            <ProjectCard project={project} />
            <ProjectForm />
          </div>
        ))}
      </ul>
    </>
  );
}
