function PageControlls({
  setProjectData,
  data,
  pageIndex,
}: {
  setProjectData: Function;
  pageIndex: number;
  data: string[];
}) {
  return (
    <div className="page-controlls">
      <button
        type="button"
        //dalete
        onClick={() =>
          setProjectData(
            data.filter((it, i) => {
              console.log(it);

              return i != pageIndex;
            })
          )
        }
      >
        [ Delete Current ]
      </button>
      <button
        type="button"
        //add
        onClick={() => {
          const newData: string[] = [];

          data.forEach((it, i) => {
            newData.push(it);
            if (i == pageIndex) newData.push("# new page");
          });

          if (data.length == 0) newData.push("# new page");

          setProjectData(newData);

          setTimeout(() => {
            document
              .querySelectorAll(".presentation-page")
              [pageIndex + 1].scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
          }, 500);
        }}
      >
        [ Add Page ]
      </button>
    </div>
  );
}

export default PageControlls;
