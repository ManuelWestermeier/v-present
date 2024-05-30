import Markdown from "react-markdown";
import "./index.css";
import usePresentationData from "../../hooks/use-presentation-data";
import PageIndexMenu from "../../comp/page-index-menu";
import usePageIndex from "../../hooks/use-page-index";

function Presentation() {
  const [data, url] = usePresentationData();
  const [presentationView, handleScroll, pageIndex, changePageIndex] =
    usePageIndex(data.length);

  return (
    <div className="presentation">
      <header className="presentation-header">
        <span className="ml-10">{url}</span>
        <PageIndexMenu
          changePageIndex={changePageIndex}
          pageIndex={pageIndex}
          presentationView={presentationView}
        />
      </header>
      <div
        className="presentation-view"
        ref={presentationView}
        onScroll={handleScroll}
      >
        {data.map((markdown: string, index: number) => (
          <Markdown key={index} className="presentation-page">
            {markdown}
          </Markdown>
        ))}
      </div>
    </div>
  );
}

export default Presentation;
