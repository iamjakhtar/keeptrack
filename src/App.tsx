import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import HomePage from "./home/HomePage";
import ProjectsPage from "./projects/ProjectsPage";
import ProjectPage from "./projects/ProjectPage";
import { store } from "./state";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      
      <Router>
        <header className="sticky">
          <span className="logo">
            <img src="/assets/logo-3.svg" alt="Logo" width={49} height={99} />
          </span>
          <NavLink className="button rounded" to="/">
            Home
          </NavLink>
          <NavLink className="button rounded" to="/projects">
            {" "}
            Projects{" "}
          </NavLink>
        </header>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
