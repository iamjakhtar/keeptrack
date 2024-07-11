import { Project } from "../projects/Project"
import { formatDescription } from "../projects/ProjectCard";

interface FeaturedProjectProps {
    project: Project
}

const FeaturedProject = ({ project }: FeaturedProjectProps) => {
    const {id, name, imageUrl, budget, description } = project;
  return (
    <div key={id} className="card large">
      <img src={imageUrl} alt={name} />
      <div className="section dark">
          <h3>{name}</h3>
          <p>{formatDescription(description, 30)}</p>
          <p>Budget: {budget}</p>
      </div>
    </div>
  );
}
export default FeaturedProject