import { Link } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { ProjectData } from "../../types/project-data";
import "./index.css";

function Projects() {
  const [projects, setProjects] = useLocalStorage<ProjectData[]>(
    "v-present-projects",
    [{ title: "new project", data: "# New Project", id: Math.random() }]
  );

  return (
    <div className="flex col list projects">
      {projects.map((project, index) => (
        <Link
          to={`/project/${index}`}
          key={project.id}
          className="flex center"
        >
          <h2>{project.title}</h2>
          <button
            title="delete"
            type="button"
            className="left-space"
            onClick={(e) => {
              e.preventDefault();
              setProjects(projects.filter((p) => p.id !== project.id));
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </button>
        </Link>
      ))}
      <br />
      <hr />
      <br />
      <form
        className="flex"
        onSubmit={(e) => {
          e.preventDefault();

          const fd = new FormData(e.currentTarget);
          const title = fd.get("title") + "";

          const newProject: ProjectData = {
            title,
            data: `# ${title}`,
            id: Math.random(),
          };

          setProjects((old: ProjectData[] | undefined) => [
            ...(old ?? []),
            newProject,
          ]);
        }}
      >
        <input type="text" placeholder="title..." name="title" />
        <button type="submit">add project</button>
      </form>
    </div>
  );
}

export default Projects;
