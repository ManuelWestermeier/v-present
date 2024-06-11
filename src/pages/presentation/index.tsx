import MDEditor from "@uiw/react-md-editor";
import "./index.css";
import usePresentationData from "../../hooks/use-presentation-data";
import PageIndexMenu from "../../comp/page-index-menu";
import usePageIndex from "../../hooks/use-page-index";
import HomeLink from "../../comp/home-link";

function Presentation() {
  const [data, url] = usePresentationData();
  const [presentationView, handleScroll, pageIndex, changePageIndex] =
    usePageIndex(data.length);

  return (
    <div className="presentation">
      <header className="presentation-header">
        <HomeLink />
        <span>
          {url}
        </span>
        <PageIndexMenu
          changePageIndex={changePageIndex}
          pageIndex={pageIndex}
          presentationView={presentationView}
        />
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
