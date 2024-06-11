import { RefObject } from "react";

function PageIndexMenu({
  pageIndex,
  changePageIndex,
  presentationView,
  canGoFullscreen = true,
}: {
  pageIndex: number;
  changePageIndex: Function;
  presentationView: RefObject<HTMLDivElement>;
  canGoFullscreen?: boolean;
}) {
  return (
    <div className="flex center">
      <button
        className="flex center icon"
        type="button"
        onClick={changePageIndex(false)}
        title="last"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
      </button>
      <span className="flex center mw-35">
        {pageIndex + 1}
      </span>
      <button
        type="button"
        className="flex center icon"
        title="next"
        onClick={changePageIndex(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
        </svg>
      </button>
      {canGoFullscreen && (
        <button
          type="button"
          className="flex center icon"
          onClick={() => {
            presentationView.current?.requestFullscreen();
          }}
          title="fullscreen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default PageIndexMenu;
