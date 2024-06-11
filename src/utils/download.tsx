export function downloadPresentation(data: string[]) {
  const dataBlob = new Blob([data.join("\n#page#\n")], { type: "text/plain" });
  let downloadUrl = URL.createObjectURL(dataBlob);

  const name = prompt("filename :") ?? "";
  const downloadLink = document.createElement("a");
  downloadLink.href = downloadUrl;
  downloadLink.download = `${name}.pr.md`;
  downloadLink.click();
}