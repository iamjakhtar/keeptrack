import ProjectList from "./ProjectList";
import useProjects from "./projectHooks";

const ProjectsPage = () => {
  const {
    data,
    isLoading,
    error,
    isError,
    isFetching,
    page,
    setPage,
    isPlaceholderData,
  } = useProjects();

  if (isLoading) {
    return (
      <div className="center-page">
        <span className="spinner primary"></span>
        <p>Loading...</p>
      </div>
    );
  }

  if (isError && error instanceof Error) {
    return (
      <div className="row">
        <div className="card large error">
          <section>
            <p>
              <span className="icon-alert inverse "></span>
              {error.message}
            </p>
          </section>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <h1>Projects</h1>
      {isFetching && !isLoading && <span className="toast">Refreshing...</span>}
      <ProjectList projects={data} />
      <div className="row">
        <div className="col-sm-4">Current page: {page + 1}</div>
        <div className="col-sm-4">
          <div className="button-group right">
            <button
              className="button"
              onClick={() => setPage((oldPage) => oldPage - 1)}
              disabled={page === 0}
            >
              Previous
            </button>
            <button
              className="button"
              onClick={() => {
                if (!isPlaceholderData) {
                  setPage((oldPage) => oldPage + 1);
                }
              }}
              disabled={page === 5}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;

