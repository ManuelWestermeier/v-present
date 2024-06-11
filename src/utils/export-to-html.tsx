function getDataUrlFromString(data: string): Promise<string> {
  const blob = new Blob([data], { type: "text/plain" });

  const fr = new FileReader();

  return new Promise((res) => {
    fr.onload = () => {
      res(fr.result as string);
    };

    fr.readAsDataURL(blob);
  });
}

export async function exportToHtml(data: string[]) {
  const dataUrl = await getDataUrlFromString(data.join("\n#page#\n"));

  const htmlText = `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>V-Present</title>
  </head>
  <body>
    <script>
        window.location = "https://manuelwestermeier.github.io/v-present/#/presentation?${new URLSearchParams(
          [["url", dataUrl]]
        )}"
    </script>
  </body>
  </html>`;

  const dataBlob = new Blob([htmlText], { type: "text/plain" });
  let downloadUrl = URL.createObjectURL(dataBlob);

  const name = prompt("filename :") ?? "";
  const downloadLink = document.createElement("a");
  downloadLink.href = downloadUrl;
  downloadLink.download = `${name}.pr.html`;
  downloadLink.click();
}