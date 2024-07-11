import useProjects from "../projects/projectHooks";
import { selectRandom } from "../utils/selectRandom";
import FeaturedProject from "./FeaturedProject";

const HomePage = () => {
  const { data, isFetching, isLoading, isError, error } = useProjects();

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

   const featuredProjects = selectRandom(data, 4);

  return (
    <>
      <h2>Featured Projects</h2>
      {isFetching && !isLoading && <span className="toast">Refreshing...</span>}
      <div className="featured-projects-container">
        {featuredProjects.map((project) => (
          <FeaturedProject project={project} />
        ))}
      </div>
    </>
  );
}
export default HomePage