import { Project } from "./Project";

interface ProjectListProps {
    projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
    return <pre>{JSON.stringify(projects, null, ' ')}</pre>
}