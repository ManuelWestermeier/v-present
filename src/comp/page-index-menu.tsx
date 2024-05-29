import { RefObject } from "react";

function PageIndexMenu({
  pageIndex,
  changePageIndex,
  presentationView,
}: {
  pageIndex: number;
  changePageIndex: Function;
  presentationView: RefObject<HTMLDivElement>;
}) {
  return (
    <div>
      <button type="button" onClick={changePageIndex(false)}>
        {"<Last"}
      </button>
      <span>{pageIndex + 1}</span>
      <button type="button" onClick={changePageIndex(true)}>
        {"Next>"}
      </button>
      <button
        type="button"
        onClick={() => {
          presentationView.current?.requestFullscreen();
        }}
      >
        [Fullscreen]
      </button>
    </div>
  );
}

export default PageIndexMenu;
