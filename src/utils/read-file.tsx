function readFile(e: any) {
  return new Promise<string>((resolve) => {
    const fr = new FileReader();

    fr.onload = () => {
      resolve(fr.result as string);
    };

    fr.readAsDataURL(e.target.files[0]);
  });
}

export default readFile;
