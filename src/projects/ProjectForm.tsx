import { SyntheticEvent, useState } from "react";
import { Project } from "./Project";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { ProjectState } from "./state/projectTypes";
import { AnyAction } from "redux";
import { saveProject } from "./state/projectActions";

interface ProjectFormProps {
  onCancel: () => void;
  project: Project;
}

export default function ProjectForm({
  onCancel,
  project: initialState,
}: ProjectFormProps) {
  const [project, setProject] = useState(initialState);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    budget: "",
  });

  const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();

  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;
    let updatedValue =
      type === "checkbox"
        ? checked
        : value === "number"
        ? Number(value)
        : value;

    const change = {
      [name]: updatedValue,
    };

    let updatedProject : Project;

    setProject((p) => {
      updatedProject = new Project({ ...project, ...change });
      return updatedProject;
    });
    setErrors(() => validate(updatedProject))

  };

  const validate = (project: Project) => {
    const { name, description, budget } = project;
    let errors: any = {
      name: "",
      description: "",
      budget: "",
    };

    if (name.length === 0) {
      errors.name = "Name can not be empty";
    } else if (name.length > 0 && name.length < 3) {
      errors.name = "Name must be 3 or more characters";
    }

    if (description.length === 0) {
      errors.description = "Description is required";
    }

    if (budget <= 0) {
      errors.budget = "Budget must be greater than 0";
    }

    return errors;
  };

  const isValid = () => {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    );
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!isValid()) return;
    dispatch(saveProject(project));
  };

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
      {
        errors.name.length > 0 && 
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      }
      <label htmlFor="description">Project Description</label>

      <textarea
        name="description"
        placeholder="enter description"
        value={project.description}
        onChange={handleChange}
      ></textarea>
      {
        errors.description.length > 0 &&
        <div className="card error">
          <p>{errors.description}</p>
        </div>
      }
      <label htmlFor="budget">Project Budget</label>

      <input
        type="number"
        name="budget"
        placeholder="enter budget"
        value={project.budget}
        onChange={handleChange}
      />
      {
        errors.budget.length > 0 &&
        <div className="card error">
          <p>{errors.budget}</p>
        </div>
      }
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
        <button type="button" className="bordered medium" onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
}
