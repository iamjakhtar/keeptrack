import { render, screen } from "@testing-library/react";
import { Project } from "../Project";
import ProjectCard from "../ProjectCard";
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

describe('ProjectCard', () => {
    let project: Project;
    let handleEdit: () => void;


    const setUp = () =>
      render(
        <MemoryRouter>
          <ProjectCard project={project} onEdit={handleEdit} />
        </MemoryRouter>
      );

    beforeEach(() => {
        project = new Project({
          id: 1,
          name: "Mission Impossible",
          description: "This is really difficult",
          budget: 100,
        });
        handleEdit = jest.fn();
    })

    it('should initially render', () => {
        setUp();

        const budgetText = screen.getByText(/budget : 100/i);
        expect(budgetText).toBeInTheDocument();
    })

    it('should call handleEdit when edit button is clicked', async () => {
        setUp()

        const user = userEvent.setup();
        const editButton = screen.getByRole('button', { name: /edit/i});
        await user.click(editButton);
        expect(handleEdit).toHaveBeenCalledTimes(1);
        expect(handleEdit).toHaveBeenCalledWith(project);
    })

    it('snapshot', () => {
        const tree = renderer
          .create(
            <MemoryRouter>
              <ProjectCard project={project} onEdit={handleEdit} />
            </MemoryRouter>
          ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})