import MDEditor from "@uiw/react-md-editor";
import "./index.css";
import usePresentationData from "../../hooks/use-presentation-data";
import PageIndexMenu from "../../comp/page-index-menu";
import usePageIndex from "../../hooks/use-page-index";
import HomeLink from "../../comp/home-link";
import useRemix from "../../hooks/use-remix";

function Presentation() {
  const [data, url] = usePresentationData();
  const [presentationView, handleScroll, pageIndex, changePageIndex] =
    usePageIndex(data.length);
  const remix = useRemix(data);

  return (
    <div className="presentation">
      <header className="presentation-header">
        <HomeLink />
        <span>{url}</span>
        <div className="flex">
          <PageIndexMenu
            changePageIndex={changePageIndex}
            pageIndex={pageIndex}
            presentationView={presentationView}
          />
          <button
            className="flex center icon"
            type="button"
            title="remix project"
            onClick={() => remix()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M480-80 200-360l56-57 184 184v-287h80v287l184-183 56 56L480-80Zm-40-520v-120h80v120h-80Zm0-200v-80h80v80h-80Z" />
            </svg>
          </button>
        </div>
      </header>
      <div
        className="presentation-view only-presentation"
        ref={presentationView}
        onScroll={handleScroll}
      >
        {data.map((markdown: string, index: number) => (
          <MDEditor.Markdown
            source={markdown}
            key={index}
            className="presentation-page"
          ></MDEditor.Markdown>
        ))}
      </div>
    </div>
  );
}

export default Presentation;
