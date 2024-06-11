import "./index.css";

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
    <div className="page-controlls flex">
      <button
        type="button"
        className="icon"
        //delete
        title="[ Delete Current Page ]"
        onClick={() =>
          setProjectData(
            data.filter((it, i) => {
              console.log(it);
              return i != pageIndex;
            })
          )
        }
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
      <button
        className="icon"
        type="button"
        title="[ Add Page ]"
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
      </button>
    </div>
  );
}

export default PageControlls;
