import { Provider } from "react-redux";
import { store } from "../../state";
import { MemoryRouter } from "react-router-dom";
import ProjectList from "../ProjectList";
import { MOCK_PROJECTS } from "../MockProjects";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const setUp = () => {
    render(
      <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <MemoryRouter>
              <ProjectList projects={MOCK_PROJECTS} />
            </MemoryRouter>
          </Provider>
      </QueryClientProvider>
    );
}

describe('ProjectList', () => {

    it('should render without crashing', () => {
        setUp();
        expect(screen).toBeDefined();
    })

    it('should display list of projects', () => {
        setUp();
        expect(screen.getAllByRole('heading')).toHaveLength(MOCK_PROJECTS.length);
        expect(screen.getAllByRole('img')).toHaveLength(MOCK_PROJECTS.length);
        expect(screen.getAllByRole('link')).toHaveLength(MOCK_PROJECTS.length);
        expect(screen.getAllByRole('button')).toHaveLength(MOCK_PROJECTS.length);
    })

    it('should display form when edit button is clicked', async () => {
        setUp();
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: /edit wisozk group/i}));
        const editForm =  screen.getByRole('form', { name: /edit a project/i});
        expect(editForm).toBeInTheDocument();
    })

    it('should display project image and remove form when cancel button clicked', async () => {
        setUp();
        const user = userEvent.setup();
        await user.click(
          screen.getByRole("button", { name: /edit lesch - waelchi/i })
        );
        await user.click(screen.getByRole('button', { name: /cancel/i}));
        expect(
          screen.getByRole("img", { name: /lesch - waelchi/i })
        ).toBeInTheDocument();
        expect(screen.queryByRole('form', { name: /edit a project/i})).not.toBeInTheDocument();
    })
})