import { SyntheticEvent, useState } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
  onCancel: () => void;
  onSave: (project: Project) => void;
  project: Project;
}

export default function ProjectForm({onCancel, onSave, project: initialState }: ProjectFormProps) {
    
    const [project, setProject] = useState(initialState);


    const handleChange = (event: any) => {
      const { type, name, value, checked } = event.target;
      
      let updatedValue = type === 'checkbox' ? checked : value === 'number' ? Number(value) : value;
      

      const change = {
        [name]: updatedValue
      }

      setProject((p) => new Project({...project, ...change}));
    }

    const handleSubmit = (event: SyntheticEvent) => {
      event.preventDefault();
      onSave(project);
    }

    return (
      <form className="input-group vertical" onSubmit={handleSubmit}>
        <label htmlFor="name">Project Name</label>
        <input 
        type="text" 
        name="name" 
        placeholder="enter name" 
        value={project.name}
        onChange={handleChange}
        />
        <label htmlFor="description">Project Description</label>

        <textarea 
        name="description" 
        placeholder="enter description"
        value={project.description}
        onChange={handleChange}
        ></textarea>
        <label htmlFor="budget">Project Budget</label>

        <input 
        type="number" 
        name="budget" 
        placeholder="enter budget" 
        value={project.budget}
        onChange={handleChange}
        />
        <label htmlFor="isActive">Active?</label>
        <input 
        type="checkbox" 
        name="isActive" 
        checked={project.isActive}
        onChange={handleChange}
        />

        <div className="input-group">
          <button className="primary bordered medium">Save</button>
          <span></span>
          <button 
          type="button" 
          className="bordered medium"
          onClick={onCancel}
          >
            cancel
          </button>
        </div>
      </form>
    );
}