import useLocalStorage from "use-local-storage";
import { ProjectData } from "../types/project-data";
import { useNavigate } from "react-router-dom";

function useRemix(data: string[]) {
  const [projects] = useLocalStorage<ProjectData[]>("v-present-projects", [
    { title: "new project", data: "# New Project", id: Math.random() },
  ]);
  const navigate = useNavigate();

  return () => {
    const newProject = {
      title: prompt("project name") || "imported",
      data: data.join("\n#page#\n"),
      id: Math.random(),
    };

    localStorage.setItem(
      "v-present-projects",
      JSON.stringify([...projects, newProject])
    );

    navigate(`/project/${projects.length}`);
  };
}

export default useRemix;
