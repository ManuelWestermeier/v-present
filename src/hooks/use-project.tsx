import useLocalStorage from "use-local-storage";
import { ProjectData } from "../types/project-data";
import { useNavigate, useParams } from "react-router-dom";

function useProject(): [
  ProjectData,
  (newTitle: string) => void,
  (newData: string[]) => void
] {
  const params = useParams<{ index: string }>();
  const index = parseInt(params.index || "0") || 0;
  const navigate = useNavigate();

  // Convert the index from string to number
  const projectIndex = Number(index);

  const [projects, setProjects] = useLocalStorage<ProjectData[]>(
    "v-present-projects",
    [{ title: "new project", data: "# New Project", id: Math.random() }]
  );

  if (!projects[projectIndex]) {
    navigate("/");
    return [{ title: "", id: 0, data: "" }, () => undefined, () => undefined];
  }

  const updateTitle = (newTitle: string) => {
    setProjects((oldProjects: ProjectData[] | undefined) =>
      (oldProjects ?? []).map((project: ProjectData, i: number) => {
        if (i !== projectIndex) {
          return project;
        }
        return { ...project, title: newTitle };
      })
    );
  };

  const setProjectData = (newData: string[]) => {
    const data = newData.join("\n#page#\n");
    setProjects((oldProjects: ProjectData[] | undefined) =>
      (oldProjects ?? []).map((project: ProjectData, i: number) => {
        if (i !== projectIndex) {
          return project;
        }
        return { ...project, data };
      })
    );
  };

  return [projects[projectIndex], updateTitle, setProjectData];
}

export default useProject;
