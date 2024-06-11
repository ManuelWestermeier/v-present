export default function openFile(setProjectData: (newData: string[]) => void) {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".md"

  fileInput.onchange = () => {
    const file = fileInput.files?.item(0);

    if (!file) return;

    const fr = new FileReader();

    fr.onload = () => {
      if (typeof fr.result === "string") {
        setProjectData(fr.result.split("\n#page#\n"));
      }
    };

    fr.readAsText(file);
  };

  fileInput.click();
}
